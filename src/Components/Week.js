import React from 'react';
import ReactDOM from 'react-dom';
import { Day } from './Day';

export class Week extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      expandedDay: null
    };
    this.createDays = this.createDays.bind(this);
    this.toggleDayInfo = this.toggleDayInfo.bind(this);
  }

  toggleDayInfo(id){
    // Save id of clicked day, it will be expanded on render
    this.setState( (prevState) => {
      let newID = (prevState.expandedDay === id) ? null : id;
      return { expandedDay: newID }
    });
  }

  createDays() {
    const date = new Date();
    const dayOfWeek = date.getDay();
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let extraDays = days.slice(0, dayOfWeek );
    days.splice(0, dayOfWeek );
    let adjustedDays = days.concat(extraDays);

    const dayList = adjustedDays.map( (value, i) =>
      (<Day key={'day' + i} id={'day' + i}
        name={ (i===0) ? 'Today' : value }
        data={ this.props.data[i] }
        expanded={ this.state.expandedDay == ('day' + i) ? true : false }
        toggleExpand={ this.toggleDayInfo }
      />)
    );
    return dayList;
  }


  render(){
    return (
      <section>
        <h1 className='subTitle'>Weekly Outlook</h1>
        <section className='week-container'>
          { this.createDays() }
        </section>
      </section>
    );
  }
}
