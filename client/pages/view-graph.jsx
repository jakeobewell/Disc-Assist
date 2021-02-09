import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default class ViewGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      sortBy: 'lastTen'
    };
    this.getRecords = this.getRecords.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderGraph = this.renderGraph.bind(this);
  }

  componentDidMount() {
    this.getRecords();
  }

  handleChange(event) {
    const userId = 1;
    const sortBy = event.target.value;
    fetch(`/api/rounds/${userId}?sort=${sortBy}`)
      .then(response => response.json())
      .then(data => this.setState({ records: data, sortBy: sortBy }))
      .catch(err => console.error(err));
  }

  getRecords() {
    const userId = 1;
    const sortBy = this.state.sortBy;
    fetch(`/api/rounds/${userId}?sort=${sortBy}`)
      .then(response => response.json())
      .then(data => this.setState({ records: data }))
      .catch(err => console.error(err));
  }

  renderGraph() {
    const records = [...this.state.records];
    const data = [];
    records.map(record => {
      const date = record.date;
      const index = date.indexOf('T');
      const trimDate = date.slice(0, index);
      data.unshift({
        entry: `${record.courseName}, ${trimDate}`,
        score: record.totalScore
      });
      return '';
    });
    return (
      <LineChart height={400} width={600} data={data}>
        <Line type='monotone' dataKey="score" stroke="#00aa44" />
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='entry' />
        <YAxis />
        <Tooltip />
      </LineChart>
    );
  }

  render() {
    return (
      <>
        <form className="view-select row justify-content-center my-3">
          <label htmlFor="view" className="mr-2">View:</label>
          <select id="view" name="view" onChange={this.handleChange}>
            <option value="lastTen">Last Ten</option>
            <option value="allTime">All Time</option>
          </select>
        </form>
        {this.renderGraph()}
        <div className="row justify-content-center my-3">
          <a href='#records'><button className="back-button m-2">Back</button></a>
        </div>
      </>
    );
  }

}
