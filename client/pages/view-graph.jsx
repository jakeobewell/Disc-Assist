import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import AppContext from '../lib/app-context';

export default class ViewGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      sortBy: 'lastFive'
    };
    this.getRecords = this.getRecords.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderGraph = this.renderGraph.bind(this);
  }

  componentDidMount() {
    this.getRecords();
  }

  handleChange(event) {
    const userId = this.context.userId;
    const sortBy = event.target.value;
    fetch(`/api/rounds/${userId}?sort=${sortBy}`)
      .then(response => response.json())
      .then(data => this.setState({ records: data, sortBy: sortBy }))
      .catch(err => console.error(err));
  }

  getRecords() {
    const userId = this.context.userId;
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
        <XAxis dataKey='entry' hide={true}/>
        <YAxis />
        <Tooltip />
      </LineChart>
    );
  }

  render() {
    return (
      <>
        <form className="view-select row justify-content-center my-3">
          <label htmlFor="view" className="mr-2 drop">View:</label>
          <select id="view" name="view" onChange={this.handleChange}>
            <option value="lastFive">Last Five</option>
            <option value="allTime">All Time</option>
          </select>
        </form>
        <div className="graph-container row justify-content-center">
        {this.renderGraph()}
        </div>
        <div className="row justify-content-center my-3">
          <a href='#records'><button className="back-button m-2">Back</button></a>
        </div>
      </>
    );
  }

}

ViewGraph.contextType = AppContext;
