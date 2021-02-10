import React from 'react';

export default class RoundData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: []
    };
  }

  componentDidMount() {
    this.getScores();
  }

  getScores() {
    const roundId = this.props.roundId;
    fetch(`/api/scores/${roundId}`)
      .then(response => response.json())
      .then(data => this.setState({ scores: data }))
      .catch(err => console.error(err));
  }

  renderScores() {
    const scores = [...this.state.scores];
    if (scores !== []) {
      const scoresList = scores.map(score => {
        return (
          <div className="row m-2 hole-row justify-content-around" key={score.holeNumber}>
            <p>Hole: {score.holeNumber}</p>
            <p>Par: {score.par}</p>
            <p>Score: {score.score}</p>
          </div>
        );
      });
      return scoresList;
    }
  }

  render() {
    return (
    <div className='container-fluid'>
      <div className="row justify-content-center mx-0">
        <div className="record-data my-2">
          {this.renderScores()}
        </div>
      </div>
      <div className="row justify-content-center">
          <a href='#records'><button className="back-button m-2">Back</button></a>
      </div>
    </div>
    );
  }

}
