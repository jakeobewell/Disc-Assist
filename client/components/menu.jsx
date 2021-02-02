import React from 'react';

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { open: false };
  }

  handleClick() {
    if (this.state.open === false) {
      this.setState({ open: true });
    }
    if (this.state.open === true) {
      this.setState({ open: false });
    }
  }

  render() {
    if (this.state.open === false) {
      return (
        <i className="fa fa-bars menu-icon" onClick={this.handleClick}></i>
      );
    }
    if (this.state.open === true) {
      return (
        <div className="page">
          <div className="menu-container">
            <a href="#" className="menu-anchor" onClick={this.handleClick}>Home</a>
            <a href="#courses" className="menu-anchor" onClick={this.handleClick}>View Your Courses</a>
            <a href="#search" className="menu-anchor" onClick={this.handleClick}>Find Courses</a>
            <a href="#courseForm" className="menu-anchor" onClick={this.handleClick}>Enter New Course</a>
            <a href="#records" className="menu-anchor" onClick={this.handleClick}>Records</a>
          </div>
          <div className="shade" onClick={this.handleClick}></div>
        </div>
      );
    }
  }
}
