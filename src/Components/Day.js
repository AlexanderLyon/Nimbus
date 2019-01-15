import React from 'react';
import ReactDOM from 'react-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

export class Day extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick() {
    this.props.toggleExpand( this.props.id );
  }


  convertTime( seconds ) {
    let date = new Date(seconds * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let meridian = "AM";

    // Misc adjustments:
    if (hours > 12) {
      hours = hours - 12;
      meridian = "PM";
    }
    minutes = (String(minutes).length === 1) ? "0" + minutes : minutes;

    return hours + ":" + minutes + " " + meridian;
  }


  render(){
    return (
      <div className={ this.props.expanded ? 'day expanded' : 'day' } onClick={this.handleClick}>
        <img className='daily-icon' src={'src/images/' + this.props.data.icon + '.svg'} alt='weather' />
        <p className='day-name'>{ this.props.name }</p>

        <div className='day-info'>
          <span className='precip'>
            <i className='fas fa-tint'></i> { Math.round(this.props.data.precipProbability * 100) + '%'}
          </span>
          <span className='low-high'>
            <i className="fas fa-thermometer-half"></i>
            <span className='high'><b> { Math.round(this.props.data.temperatureHigh) +'°'} </b></span> /
            <span className='low'> { Math.round(this.props.data.temperatureLow) +'°'} </span>
          </span>
        </div>

        <CSSTransitionGroup transitionName="slideDown"
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}>
        { this.props.expanded &&
          <div className='expanded-day'>
            <h1>{this.props.data.summary}</h1>
            <p className="sunriseSunset">
               <b>Sunrise:</b> {this.convertTime(this.props.data.sunriseTime)}
               <br/>
               <b>Sunset:</b> {this.convertTime(this.props.data.sunsetTime)}
            </p>
          </div>
        }
        </CSSTransitionGroup>

      </div>
    );
  }
}
