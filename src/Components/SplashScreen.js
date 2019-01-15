import React from 'react';
import ReactDOM from 'react-dom';

export class SplashScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }


  render(){
    return (
      <div id="splash-screen">
      { this.props.loading &&
        <div id="data-loading">
          <h1>Getting your weather</h1>
          <p>Please wait...</p>
          <img src="src/images/loading.svg" alt="Loading"/>
        </div>
      }
      { this.props.error &&
        <div id="data-error">
          <h4>Sorry, the service is currently unavailable. Please try again later.</h4>
        </div>
      }
      </div>
    );
  }
}
