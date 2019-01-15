import React from 'react';
import ReactDOM from 'react-dom';

export class Current extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return (
      <section>
        <h1 className='subTitle'>Current Conditions</h1>
        <div id="current-wrapper">
          <div id="info-left">
            <img id="current-icon" src={'src/images/' + this.props.data.icon + '.svg'} alt='weather'/>
            <h1 id="current-temp">{ Math.round(this.props.data.temperature) + '°'}</h1>
          </div>
          <div id="info-right">
            <p id="current-summary"><b>{this.props.data.summary}</b></p>
            <p id="current-humidity">Humidity: { Math.round(100 * this.props.data.humidity) + '%' }</p>
            <p id="current-wind">Wind speed: {Math.round(this.props.data.windSpeed) + ' mph'}</p>
            <p id="current-visibility">Visibility: { this.props.data.visibility + ' miles'}</p>
            <p id="current-uv">UV Index: {this.props.data.uvIndex}</p>
          </div>
        </div>
      </section>
    );
  }
}
