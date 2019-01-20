import React from 'react';
import ReactDOM from 'react-dom';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <header>
        <p id="location" onClick={this.props.openLocationMenu}>
          <i className="fas fa-location-arrow"></i> {this.props.cityName}
        </p>
        <p id="last-updated"><i class="fas fa-clock"></i> Last updated: {this.props.lastUpdated}</p>
        <button id="refreshBtn" className="btn"
          onClick={this.props.fetchData}>
            <i className={ this.props.refreshing ? "refreshing fas fa-sync-alt" : "fas fa-sync-alt" }></i>Refresh
        </button>
      </header>
    );
  }
}