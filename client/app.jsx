import React from 'react';
import Home from './pages/home';
import parseRoute from './lib/parse-route';
import Nav from './components/nav';
import CourseForm from './pages/course-form';

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
