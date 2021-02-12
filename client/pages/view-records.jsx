import React from 'react';
import AppContext from '../lib/app-context';

export default class ViewRecords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      sortBy: 'date'
    };
    this.getRecords = this.getRecords.bind(this);
  }

  componentDidMount() {
    this.getRecords();
  }

  getRecords() {
    const userId = this.context.userId;
    fetch(`/api/rounds/${userId}`)
      .then(response => response.json())
      .then(data => this.setState({ records: data }))
      .catch(err => console.error(err));
  }

  renderRecords() {
    const records = [...this.state.records];
    const recordList = records.map(record => {
      const date = record.date;
      const index = date.indexOf('T');
      const trimDate = date.slice(0, index);
      return (
        <div key={record.roundId} className="record-container m-2">
          <p>Course Name: {record.courseName}</p>
          <p>Date: {trimDate}</p>
          <p>Score: {record.totalScore}</p>
          <a className="view-round" href={`#round-data?roundId=${record.roundId}`}>
            <button id={record.roundId} className="view-round-button">View Round</button>
          </a>
        </div>
      );
    });
    return recordList;
  }

  render() {
    return (
      <>
        <h2 className="text-center">Records</h2>
        <div className="row justify-content-center my-3">
          <a href="#view-graph"><button className="graph-button">View Graph</button></a>
        </div>
        <div className="container-fluid">
          <div className="row justify-content-center">
            {this.renderRecords()}
          </div>
        </div>
      </>
    );
  }
}

ViewRecords.contextType = AppContext;
