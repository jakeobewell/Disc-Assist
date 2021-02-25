import React from 'react';
import Home from './pages/home';
import parseRoute from './lib/parse-route';
import Nav from './components/nav';
import CourseForm from './pages/course-form';
import ViewCourses from './pages/view-courses';
import RecordForm from './pages/record-form';
import ViewRecords from './pages/view-records';
import RoundData from './pages/round-data';
import ViewGraph from './pages/view-graph';
import EditCourse from './pages/edit-course';
import AppContext from './lib/app-context';
import SignUp from './pages/sign-up';
import SignIn from './pages/sign-in';
import NewUser from './pages/new-user';
import decodeToken from './lib/decode-token';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      userId: ''
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
    const token = window.localStorage.getItem('disc-assist-jwt');
    const user = token ? decodeToken(token) : '';
    this.setState({ userId: user.userId });
  }

  handleSignIn(result) {
    const { userId, token } = result;
    window.localStorage.setItem('disc-assist-jwt', token);
    this.setState({ userId });
  }

  handleSignOut() {
    window.localStorage.removeItem('disc-assist-jwt');
    this.setState({ userId: '' });
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === 'sign-up') {
      return <SignUp />;
    }
    if (path === 'sign-in') {
      if (!this.state.userId) {
        return <SignIn onSignIn={this.handleSignIn} />;
      } else {
        window.location.hash = '#';
      }
    }
    if (!this.state.userId) {
      return <NewUser />;
    } else {
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
      if (path === 'records') {
        return <ViewRecords />;
      }
      if (path === 'round-data') {
        const roundId = this.state.route.params.get('roundId');
        return <RoundData roundId={roundId} />;
      }
      if (path === 'view-graph') {
        return <ViewGraph />;
      }
      if (path === 'edit-course') {
        const courseId = this.state.route.params.get('courseId');
        return <EditCourse courseId={courseId} />;
      }
    }
  }

  render() {
    const userId = this.state.userId;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { userId, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          <Nav onSignOut={handleSignOut} user={this.state.userId} />
          { this.renderPage() }
        </>
      </AppContext.Provider>
    );
  }
}
