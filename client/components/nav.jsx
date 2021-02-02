import React from 'react';
import Menu from '../components/menu';

export default function Nav(props) {
  return (
    <>
      <div className="container-fluid nav">
        <Menu />
        <h1 className="title">DiscAssist</h1>
      </div>
    </>
  );
}
