import React from 'react';
import ReactDOM from 'react-dom';

export class ChooseLocation extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showSubmit: false
    };
    this.handleKeyup = this.handleKeyup.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.printHistory = this.printHistory.bind(this);
    this.clickHistory = this.clickHistory.bind(this);
  }


  componentDidMount() {
    /*document.getElementById('loc-input').focus();*/
  }


  handleKeyup(e) {
    if (e.target.value.trim() !== '') {
      this.setState({ showSubmit: true });
    }
    else {
      this.setState({ showSubmit: false });
    }
  }


  handleSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.changeLocation();
  }


  printHistory() {
    let history = this.props.history;
    const historyList = history.map( (value, i) =>
      <li key={'s'+i} onClick={this.clickHistory}>
        {value}
      </li>
    );
    return historyList;
  }


  clickHistory(event) {
    const location = event.target.textContent;
    document.getElementById('loc-input').value = location;
    this.handleSubmit();
  }


  render(){
    return (
      <div id="manualEntry">
        { this.props.closable &&
          <button className="close-btn" onClick={this.props.closeMenu}>&times;</button>
        }
        <div id="location-wrapper">
          { this.props.errorMessage &&
            <p id="errorDialog">{this.props.errorMessage}</p>
          }
          <h1>Search for a location</h1>
          <form id="locationSearch" onSubmit={this.handleSubmit}>
            <input type="search" id="loc-input" placeholder="Enter a location" autoComplete="off"
              onKeyUp={this.handleKeyup}
              onChange={this.props.updateEnteredCity}
            />
            { this.state.showSubmit && 
              <button type="submit">
                <i className="fas fa-arrow-right"></i>
              </button>
            }
            { (false && this.props.history) && (
              <div id="history">
                <h4>Recent locations:</h4>
                <ul> {this.printHistory()} </ul>
              </div>
            )}
            <button className="btn currentLoc" onClick={ this.props.useCurrentLocation }>
              <i className="fas fa-compass"></i> Use my Current Location
            </button>
          </form>
        </div>
      </div>
    );
  }
}
