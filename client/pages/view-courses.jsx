import React from 'react';

export default class ViewCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: []
    };
    this.getCourses = this.getCourses.bind(this);
    this.renderCourses = this.renderCourses.bind(this);
  }

  componentDidMount() {
    this.getCourses();
  }

  getCourses() {
    const userId = 1;
    fetch(`/api/courses/${userId}`)
      .then(response => response.json())
      .then(data => this.setState({ courses: data }))
      .catch(err => console.error(err));
  }

  renderCourses() {
    const courses = [...this.state.courses];
    const courseList = courses.map(course => {
      return (
        <div className="course-container m-2" key={course.courseId}>
          <p>Course Name: {course.courseName}</p>
          <p>Location: {course.city}</p>
          <p>Number of Holes: {course.holes}</p>
          <div className="row button-container">
            <a href={`#record-round?courseId=${course.courseId}`}>
              <button className="course-button" id={`start${course.courseId}`}>Start Round</button>
            </a>
            <a href={`#edit-course?courseId=${course.courseId}`}>
              <button className="course-button" id={`edit${course.courseId}`}>Edit Course</button>
            </a>
          </div>
        </div>
      );
    });
    return courseList;
  }

  render() {
    return (
      <>
        <h2 className="text-center">Courses</h2>
        <div className="container-fluid">
          <div className="row justify-content-center flex-wrap">
            {this.renderCourses()}
          </div>
        </div>
      </>
    );
  }

}
