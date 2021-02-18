import React from 'react';

export default function Home(props) {
  return (
    <>
      <div className="container-fluid home-container">
        <div className="row justify-content-center">
          <a href="#courses" className="home-anchor"><button className="home-button">Start Round</button></a>
        </div>
        <div className="row justify-content-center">
          <a href="#courseForm" className="home-anchor"><button className="home-button">Enter New Course</button></a>
        </div>
        <div className="row justify-content-center">
          <a href="#records" className="home-anchor"><button className="home-button">View Records</button></a>
        </div>
      </div>
    </>
  );
}
