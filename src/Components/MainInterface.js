import React from 'react';
import ReactDOM from 'react-dom';
import { Current } from './Current';
import { Alert } from './Alert';
import { Hourly } from './Hourly';
import { Week } from './Week';

export class MainInterface extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pwa: false
    };
  }


  componentWillMount() {
    // Check if this is a progressive web app:
    if(window.location.search.indexOf('pwa=true') !== -1){
      this.setState({ pwa: true });
    } else {
      this.setState({ pwa: false });
    }
  }


  render(){
    return (
      <div>
        { this.state.pwa &&
          <div id='buffer' className={ this.props.solidTopBuffer ? "solid" : ""}></div>
        }
        <div id="wrapper">
          <h1 className='title'>Weather Forecast</h1>
          <p id="location" onClick={this.props.openLocationMenu}>
            <i className="fas fa-location-arrow"></i> {this.props.cityName}
          </p>
          <p id="last-updated">Last updated: {this.props.lastUpdated}</p>
          <hr/>
          <button id="refreshBtn" className="btn"
            onClick={this.props.fetchData}>
              <i className={ this.props.refreshing ? "refreshing fas fa-sync-alt" : "fas fa-sync-alt" }></i>Refresh
          </button>
          <div id="content">
            { this.props.currentData && <Current data={this.props.currentData}/> }
            { this.props.allData && <Alert data={this.props.allData.minutely}/> }
            { this.props.hourlyData && <Hourly data={this.props.hourlyData}/> }
            { this.props.weekData && <Week data={this.props.weekData}/> }
          </div>
          <footer>
            <button id="pushButton" className="btn"></button>
            <a id="credit" href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
          </footer>
        </div>
      </div>
    );
  }
}
