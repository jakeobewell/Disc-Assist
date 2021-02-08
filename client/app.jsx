import React from 'react';
import Home from './pages/home';
import parseRoute from './lib/parse-route';
import Nav from './components/nav';
import CourseForm from './pages/course-form';
import ViewCourses from './pages/view-courses';
import RecordForm from './pages/record-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return <Home />;
    }
    if (path === 'courseForm') {
      return <CourseForm />;
    }
    if (path === 'courses') {
      return <ViewCourses />;
    }
    if (path === 'record-round') {
      const courseId = this.state.route.params.get('courseId');
      return <RecordForm courseId={courseId} />;
    }
  }

  render() {
    return (
      <>
        <Nav />
        {this.renderPage()}
      </>
    );
  }
}
