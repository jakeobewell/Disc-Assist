import React from 'react';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const input = event.target.id;
    if (input === 'username') {
      this.setState({ username: event.target.value });
    }
    if (input === 'password') {
      this.setState({ password: event.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.username === '' ||
      this.state.password === '') {
      // empty;
    } else {
      fetch('/api/users/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      })
        .then(res => res.json())
        .then(result => {
          if (result.userId && result.token) {
            this.props.onSignIn(result);
          }
        })
        .catch(err => console.error(err));
    }
  }

  render() {
    let message = null;
    if (this.state.username === '') {
      message = 'A username is required';
    } else if (this.state.password === '') {
      message = 'A password is required';
    }
    return (
      <div className="container-fluid">
        <h2 className="text-center">Sign In</h2>
        <div className="row justify-content-center">
          <form className="course-form" onSubmit={this.handleSubmit}>
            <label htmlFor="username">username: </label>
            <input id="username" type="text" value={this.state.username} onChange={this.handleChange}></input>
            <label htmlFor="password">password: </label>
            <input id="password" type="password" value={this.state.password} onChange={this.handleChange}></input>
            <button className="submit-button" type="submit" value="submit">Submit</button>
          </form>
        </div>
        <p className="text-center text-danger">{message}</p>
        <div className="row justify-content-center">
          <a href='#'><button className="back-button m-2">Back</button></a>
        </div>
      </div>
    );
  }
}
