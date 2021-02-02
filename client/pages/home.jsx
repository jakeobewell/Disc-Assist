import React from 'react';
import Nav from '../components/nav';

export default function Home(props) {
  return (
    <>
      <Nav />;
      <div className="container-fluid">
        <a href="#courses" className="home-anchor"><button className="home-button">Start Round</button></a>
        <a href="#search" className="home-anchor"><button className="home-button">Find Courses Near You</button></a>
        <a href="#courseForm" className="home-anchor"><button className="home-button">Enter Course Information</button></a>
        <a href="#records" className="home-anchor"><button className="home-button">View Records</button></a>
      </div>
    </>
  );
}
