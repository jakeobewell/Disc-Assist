import React from 'react';

export default class CourseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseName: '',
      city: '',
      holes: 18
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.courseName === '' ||
    this.state.city === '') {
      // empty;
    } else {
      fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      })
        .then(() => {
          event.target.reset();
          window.location.hash = '#';
        })
        .catch(err => console.error(err));
    }
  }

  handleChange(event) {
    const input = event.target.id;
    if (input === 'courseName') {
      this.setState({ courseName: event.target.value });
    }
    if (input === 'city') {
      this.setState({ city: event.target.value });
    }
    if (input === 'nine' || input === 'eighteen') {
      this.setState({ holes: parseInt(event.target.value) });
    }
  }

  render() {
    let message = null;
    if (this.state.courseName === '') {
      message = 'A course name is required';
    } else if (this.state.city === '') {
      message = 'A city is required';
    }
    return (
    <div className="container-fluid">
      <h2 className="text-center">Enter Course Information</h2>
      <div className="row justify-content-center">
        <form className="course-form" onSubmit={this.handleSubmit}>
          <label htmlFor="courseName">Course Name: </label>
          <input id="courseName" type="text" value={this.state.courseName} onChange={this.handleChange}></input>
          <label htmlFor="city">City: </label>
          <input id="city" type="text" value={this.state.city} onChange={this.handleChange}></input>
          <div className="radio">
            <span>Holes: </span>
            <input id="nine" type="radio" value="9" checked={this.state.holes === 9} onChange={this.handleChange}></input>
            <label htmlFor="nine">9</label>
            <input id="eighteen" type="radio" value="18" checked={this.state.holes === 18} onChange={this.handleChange}></input>
            <label htmlFor="eighteen">18</label>
          </div>
          <button className="submit-button" type="submit" value="submit">Submit</button>
        </form>
      </div>
      <p className="text-center text-danger">{message}</p>
    </div>
    );
  }
}
