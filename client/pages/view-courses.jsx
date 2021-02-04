import React from 'react';

export default class ViewCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: null
    };
  }

  componentDidMount() {
    this.getCourses();
  }

  getCourses() {
    const userId = {userId: 1};
    fetch(`/api/courses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userId)
    })
    .then(response => response.json())
    .then(data => this.setState({ courses: data }))
    .catch(err => console.error(err));
  }

  renderCourses() {
    const courses = this.state.courses;
    const courseList = courses.map((course) => {
      return (
        <div className="course-container m-2">
          <p>Course Name: {course.courseName}</p>
          <p>Location: {course.city}</p>
          <p>Number of Holes: {course.holes}</p>
          <div className="row button-container">
            <button>Start Round</button>
            <button>Edit Course</button>
          </div>
        </div>
      )
    })
  }

  render() {
    return (

    )
  }

}
