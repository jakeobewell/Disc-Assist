import React from 'react';

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
    const userId = 1;
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
          <button id={record.roundId} className="view-round-button">View Round</button>
        </div>
      );
    });
    return recordList;
  }

  render() {
    return (
      <>
        <h2 className="text-center">Records</h2>
        <div className="container-fluid">
          <div className="row justify-content-center">
            {this.renderRecords()}
          </div>
        </div>
      </>
    );
  }
}
