import React from 'react';

export default function NewUser(props) {
  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <a href="#sign-in" className="home-anchor"><button className="home-button">Sign In</button></a>
        </div>
        <div className="row justify-content-center">
          <a href="#sign-up" className="home-anchor"><button className="home-button">Sign Up</button></a>
        </div>
      </div>
    </>
  );
}
