import React from 'react';
import ReactDOM from 'react-dom';
import { SplashScreen } from './SplashScreen';
import { ChooseLocation } from './ChooseLocation';
import { MainInterface } from './MainInterface';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      error: false,
      errorMsg: null,
      refreshing: false,
      lastUpdated: "Never",
      history: null,
      manualEntryEnabled: false,
      usingCurrentLocation: false,
      enteredCity: null,
      cityName: null,
      latitude: null,
      longitude: null,
      allData: null,
      currentData: null,
      hourlyData: null,
      weekData: null
    };
    this.fetchData = this.fetchData.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.getCityName = this.getCityName.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.updateEnteredCity = this.updateEnteredCity.bind(this);
    this.openLocationMenu = this.openLocationMenu.bind(this);
    this.closeLocationMenu = this.closeLocationMenu.bind(this);
    this.useCurrentLocation = this.useCurrentLocation.bind(this);
  }


  componentDidMount(){
    this.fetchData();
  }


  getLocation() {
    return new Promise((resolve, reject) => {
      // Get latitude & longitude:

      /*===== IF USER TYPED CITY IN MANUALLY */
      if( this.state.enteredCity ) {
        const xhr = new XMLHttpRequest();
        // Find lat and long from this city name:
        xhr.open("GET", "ps/getLocationData.php?enteredCity=" + encodeURIComponent(this.state.enteredCity), true);
        xhr.onload = () => {
          if (xhr.status === 200 ) {
            try {
              const data = JSON.parse(xhr.response);
              //console.log(data);

              this.setState({
                manualEntryEnabled: false,
                loading: true,
                latitude: data.results[0].geometry.location.lat,
                longitude: data.results[0].geometry.location.lng
              }, () => {
                this.getCityName(resolve)
              });
            }
            catch (e) {
              let errorMsg;
              if (e.name == 'SyntaxError') {
                // Dark Sky received a bad request
                errorMsg = "Sorry, an unknown error has occurred";
              }
              else {
                // Unknown location
                errorMsg = "Sorry, we couldn't find a location called " + this.state.enteredCity;
              }

              this.setState({
                loading: false,
                errorMsg: errorMsg,
                manualEntryEnabled: true
              });
            }
          }
        };
        xhr.send();
      }

      /*===== IF GEOLOCATION SUPPLIES LAT / LONG */
      else if( navigator.geolocation || this.state.usingCurrentLocation ) {
        navigator.geolocation.getCurrentPosition( (position) => {

          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }, () => {
            this.getCityName(resolve, reject)
          });

        }, (error) => {
          switch(error.code) {
            case error.PERMISSION_DENIED:
            case error.POSITION_UNAVAILABLE:
              reject();
              break;
          }
        });
      }
      else {
        // Browser likely does not support geolocation
        console.error("An unknown error occurred");
        this.setState({
          loading: false,
          error: true
        });
      }
    });
  }


  getCityName(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "ps/getLocationData.php?latitude=" + encodeURIComponent(this.state.latitude) + "&longitude=" + encodeURIComponent(this.state.longitude), true);
    xhr.onload = () => {
      if( xhr.status === 200 ){
        const data = JSON.parse(xhr.response);
        try {
          const city = data.results[0].address_components[2].long_name + ", " + data.results[0].address_components[5].short_name;
          this.setState({
            cityName: city,
            errorMsg: null
          });
          resolve();
        }
        catch(e) {
          this.setState({
            loading: false,
            errorMsg: "Sorry, weather data is currently unavailable for this location",
            manualEntryEnabled: true
          });
        }
      }
      else {
        console.error("Unable to get city name");
      }
    }
    xhr.onerror = () => {
      console.error("ERROR - Cannot get city name");
      reject();
    }
    xhr.send();
  }


  fetchData() {
    this.setState({ refreshing: true });
    if( !this.state.latitude || !this.state.longitude || !this.state.cityName ) {
      this.getLocation().then( () => {
        this.fetchData();
      })
      .catch( () => {
        // Location services probably disabled
        this.setState({
          refreshing: false,
          loading: false,
          manualEntryEnabled: true
        });
        return;
      });
    }
    else {
      /* Update weather information from Dark Sky API */
      const xhr = new XMLHttpRequest();
      xhr.timeout = 20000;
      console.log("Fetching data from Dark Sky...");

      xhr.open("GET", "ps/getWeather.php?latitude=" + encodeURIComponent(this.state.latitude) + "&longitude=" + encodeURIComponent(this.state.longitude), true);
      xhr.onload = () => {
        if( xhr.status === 200 ){
          const data = JSON.parse(xhr.response);
          let currentData = data.currently;
          let weekData = [];
          let hourlyData = [];
          const now = new Date();
          let hour = now.getHours(), minutes = now.getMinutes(), meridian = "AM";
          console.log(data);

          // Save hourly data for 12 hours
          for(let i=0; i<12; i++){
            hourlyData[i] = data.hourly.data[i];
          }

          // Save one week of daily weather data:
          for(let i=0; i<7; i++){
            weekData[i] = data.daily.data[i];
          }

          if( hour === 0 ){
            hour = 12;
          }
          else if( hour > 12 ){
            hour = hour - 12;
            meridian = "PM";
          }

          minutes = (minutes.toString().length === 1) ? "0" + minutes : minutes;

          this.setState({
            loading: false,
            error: false,
            refreshing: false,
            enteredCity: null,
            usingCurrentLocation: false,
            allData: data,
            currentData: currentData,
            hourlyData: hourlyData,
            weekData: weekData,
            lastUpdated: hour + ":" + minutes + " " + meridian
          });
          document.getElementById('refreshBtn').blur();
        }
        else {
          console.error("xhr status " + xhr.status);
          this.setState({
            loading: false,
            error: true
          });
        }
      };

      xhr.ontimeout = () => {
        console.error("API request timed out");
      };

      xhr.onerror = () => {
        this.setState({
          loading: false,
          error: true
        });
      };

      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send();
    }
  }


  updateEnteredCity(event) {
    this.setState({ enteredCity: event.target.value });
  }


  changeLocation() {
    let newHistory;
    if (this.state.history) {
      if( this.state.history[this.state.history.length - 1] !== this.state.enteredCity){
        newHistory = (this.state.history).concat(this.state.enteredCity);
      }
    }
    else {
      newHistory = [this.state.enteredCity];
    }
    this.setState({
      history: newHistory,
      cityName: null,
      latitude: null,
      longitude: null,
      manualEntryEnabled: false,
      loading: true
    }, () => {
      this.fetchData();
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
  }


  useCurrentLocation() {
    this.setState({
      enteredCity: null,
      latitude: null,
      longitude: null,
      loading: true,
      usingCurrentLocation: true
    }, () => {
      this.fetchData();
    });
  }


  openLocationMenu(){
    this.setState({ manualEntryEnabled: true });
  }


  closeLocationMenu() {
    this.setState({ manualEntryEnabled: false });
  }


  render(){
    return (
      <div>
        { this.state.manualEntryEnabled &&
          <ChooseLocation
            updateEnteredCity={this.updateEnteredCity}
            changeLocation={this.changeLocation}
            history={this.state.history}
            closable={this.state.cityName ? true : false}
            closeMenu={this.closeLocationMenu}
            useCurrentLocation={this.useCurrentLocation}
            errorMessage={this.state.errorMsg}
          />
        }
        { (this.state.loading || this.state.error) &&
          <SplashScreen
            loading={this.state.loading}
            error={this.state.error}
          />
        }
        <MainInterface
          fetchData={this.fetchData}
          openLocationMenu={this.openLocationMenu}
          solidTopBuffer={this.state.manualEntryEnabled || this.state.loading}
          cityName={this.state.cityName}
          allData={this.state.allData}
          currentData={this.state.currentData}
          hourlyData={this.state.hourlyData}
          weekData={this.state.weekData}
          refreshing={this.state.refreshing}
          lastUpdated={this.state.lastUpdated}
        />
      </div>
    );
  }
}


ReactDOM.render(<App/>, document.getElementById('app'));
