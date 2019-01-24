import React from 'react';
import ReactDOM from 'react-dom';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      const header = ReactDOM.findDOMNode(this);

      if (window.pageYOffset > 95) {
        header.style.height = '34px';
      }
      else {
        header.style.height = '65px';
      }
    })
  }

  render() {
    return (
      <header>
        <p id="location" onClick={this.props.openLocationMenu}>
          <i className="fas fa-location-arrow"></i> {this.props.cityName}
        </p>
        <p id="last-updated"><i className="fas fa-clock"></i> Last updated: {this.props.lastUpdated}</p>
        <button id="refreshBtn" className="btn"
          onClick={this.props.fetchData}>
            <i className={ this.props.refreshing ? "refreshing fas fa-sync-alt" : "fas fa-sync-alt" }></i>Refresh
        </button>
      </header>
    );
  }
}