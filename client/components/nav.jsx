import React from 'react';
import Menu from '../components/menu';
import AppContext from '../lib/app-context';

export default class Nav extends React.Component {

  renderSignOut() {
    if (this.props.user !== '') {
      return <span className="sign-out" onClick={this.props.onSignOut}>Sign Out</span>;
    } else {
      return <span></span>;
    }
  }

  render() {
    return (
      <>
        <div className="container-fluid nav">
          <Menu />
          <h1 className="title">DiscAssist</h1>
          {this.renderSignOut()}
        </div>
        <div className="image-container">
          <img className="image" src="https://external-preview.redd.it/w2YK47imtGBziYIQItkB71e8QcRnj0WBetAPVxNDX-A.jpg?auto=webp&s=ea1ba3f35625252d1709e0ea658b8c44c47b7514"></img>
        </div>
      </>
    );
  }
}

Nav.contextType = AppContext;
