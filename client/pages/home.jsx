import React from 'react';

export default function Home(props) {
  return (
    <>
      <div className="container-fluid">
        <a href="#courses" className="home-anchor"><button className="home-button">Start Round</button></a>
        <a href="#courseForm" className="home-anchor"><button className="home-button">Enter New Course</button></a>
        <a href="#records" className="home-anchor"><button className="home-button">View Records</button></a>
      </div>
    </>
  );
}
