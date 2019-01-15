import React from 'react';
import ReactDOM from 'react-dom';

export class Alert extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }


  render(){
    return (
      <section id='alert'>
        <p>{ this.props.data.summary }</p>
      </section>
    );
  }
}
