import React from 'react';
import ReactDOM from 'react-dom';

export class Hourly extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  createHours() {
    const now = new Date();
    let currentHour = now.getHours();
    let upcomingHours = [];

    // Hour adjustments:
    for (let i=0; i<12; i++) {
      let nextHour = currentHour + i;

      if (nextHour >= 12) {
        if (nextHour > 24) {
          upcomingHours[i] = nextHour - 24 + ' AM';
        } else if (nextHour === 24) {
          // Midnight
          upcomingHours[i] = '12 AM';
        } else if (nextHour > 12) {
          upcomingHours[i] = nextHour - 12 + ' PM';
        } else {
          // 12 aka Noon
          upcomingHours[i] = nextHour + ' PM';
        }
      }
      else if (nextHour === 0) {
        // Midnight
        upcomingHours[i] = '12 AM';
      }
      else {
        upcomingHours[i] = nextHour + ' AM';
      }
    }

    console.log(upcomingHours);

    const hourList = upcomingHours.map( (value, i) => (
      <div key={i} className="hour">
        <p className='box-title'>{value}</p>
        <img className='hourly-icon' src={'src/images/' + this.props.data[i].icon + '.svg'} alt='weather' />
        <p className='hourly-temp'>{Math.round(this.props.data[i].temperature) + '°'}</p>
        <div className='bottom-info'>
          <span className='precip'>
            <i className='fas fa-tint'></i> { Math.round(this.props.data[i].precipProbability * 100) + '%'}
          </span>
          <span className='wind-speed'>
            { Math.round(this.props.data[i].windSpeed) + ' mph'}
          </span>
        </div>
      </div>
    ));

    return hourList;
  }

  render(){
    return (
      <section>
        <h1 className='subTitle'>Hourly</h1>
        <div id='hourly-container'>
          { this.createHours() }
        </div>
      </section>
    );
  }
}
