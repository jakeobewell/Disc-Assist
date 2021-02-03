import React from 'react';

export default class CourseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseName: '',
      city: '',
      holes: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }

  handleChange(event) {
    const input = event.target.id;
    if (input === 'courseName') {
      this.setState({ courseName: event.target.value })
    }
    if (input === 'city') {
      this.setState({ city: event.target.value })
    }
    if (input === 'holes') {
      this.setState({ holes: event.target.value })
    }
  }

  render() {
    return (
    <div className="container-fluid">
      <h2 className="text-center">Enter Course Information</h2>
      <div className="row justify-content-center">
        <form className="course-form" onSubmit={this.handleSubmit}>
          <label htmlFor="courseName">Course Name: </label>
          <input id="courseName" type="text" value={this.state.courseName} onChange={this.handleChange}></input>
          <label htmlFor="city">City: </label>
          <input id="city" type="text" value={this.state.city} onChange={this.handleChange}></input>
          <label htmlFor="holes">Number of Holes: </label>
          <input id="holes" type="text" value={this.state.holes} onChange={this.handleChange}></input>
          <button type="submit" value="submit">Submit</button>
        </form>
      </div>
    </div>
    )
  }
}
