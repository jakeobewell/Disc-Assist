import React from 'react';
import { render } from 'react-dom';

export default class RecordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      round: {
        userId: 1,
        courseId: this.props.courseId,
        totalScore: 0
      },
      course: {
        courseName: '',
        holes: 18
      },
      scores: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.renderHoles = this.renderHoles.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {
    if (this.state.course.courseName === '') {
    fetch(`/api/course/${this.props.courseId}`)
      .then(res => res.json())
      .then(result => {
        const course = result[0];
        const scores = [];
        for (let i = 1; i < parseInt(course.holes) + 1; i++) {
          scores.push({
            holeNumber: i,
            par: '',
            score: ''
          })
        }
        this.setState( { course, scores })
      })
      .catch(err => console.error(err));
    }
  }

  handleChange(event) {
    const input = event.target.id;
    if (input.startsWith('par')) {
      const scoreIndex = parseInt(input.slice(3)) - 1;
      const newScores = [...this.state.scores];
      if (event.target.value) {
        newScores[scoreIndex].par = parseInt(event.target.value);
      }
      else {
        newScores[scoreIndex].par = '';
      }
      this.setState({ scores: newScores })
    }
    if (input.startsWith('score')) {
      const scoreIndex = parseInt(input.slice(5)) -1;
      const newScores = [...this.state.scores];
      if(event.target.value) {
      newScores[scoreIndex].score = parseInt(event.target.value);
      }
      else{
        newScores[scoreIndex].score = '';
      }
      const newRound = Object.assign({}, this.state.round);
      let newTotal = 0;
      newScores.map((score) => {
        if (score.score !== '') {
        newTotal += score.score
        }
      })
      newRound.totalScore = newTotal;
      this.setState({ scores: newScores,  round: newRound })

    }
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch(`/api/rounds`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(() => {
        window.location.hash = '#'
      })
      .catch(err => console.error(err));
  }

  renderHoles() {
    const scores = [...this.state.scores];
    if (scores !== []) {
    const formHoles = scores.map((score) => {
      return (
        <div className="row m-2 hole-row justify-content-around" key={score.holeNumber}>
          <p>Hole: {score.holeNumber}</p>
          <label htmlFor={`par${score.holeNumber}`}>Par: </label>
          <input id={`par${score.holeNumber}`} type="text" onChange={this.handleChange} value={score.par}></input>
            <label htmlFor={`score${score.holeNumber}`}>Score: </label>
          <input id={`score${score.holeNumber}`} type="text" onChange={this.handleChange} value={score.score}></input>
        </div>
      );
    });
    return formHoles;
   }
  }

  render() {
    return (
      <div className="container-fluid">
        <h2 className="text-center">{this.state.course.courseName}</h2>
        <div className="row justify-content-center mx-0">
          <form className="record-form mx-0" onSubmit={this.handleSubmit}>
            {this.renderHoles()}
            <div className="row button-container">
              <button>Add Hole</button>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
