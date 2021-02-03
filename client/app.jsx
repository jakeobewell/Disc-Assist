import React from 'react';
import Home from './pages/home';
import parseRoute from './lib/parse-route';
import Nav from './components/nav';

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
  }

  render() {
    return (
      <>
        <Nav />
      </>
    );
  }
}
