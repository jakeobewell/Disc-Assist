import React from 'react';

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
      scores: [],
      message: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.renderHoles = this.renderHoles.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
            });
          }
          this.setState({ course, scores });
        })
        .catch(err => console.error(err));
    }
  }

  handleChange(event) {
    const input = event.target.id;
    if (input.startsWith('par')) {
      const scoreIndex = parseInt(input.slice(3)) - 1;
      const newScores = [...this.state.scores];

      if (parseInt(event.target.value) || parseInt(event.target.value) === 0) {
        newScores[scoreIndex].par = parseInt(event.target.value);
      } else {
        newScores[scoreIndex].par = event.target.value;
      }
      this.setState({ scores: newScores });
    }
    if (input.startsWith('score')) {
      const scoreIndex = parseInt(input.slice(5)) - 1;
      const newScores = [...this.state.scores];
      if (parseInt(event.target.value) || parseInt(event.target.value) === 0) {
        newScores[scoreIndex].score = parseInt(event.target.value);
      } else {
        newScores[scoreIndex].score = event.target.value;
      }
      const newRound = Object.assign({}, this.state.round);
      let newTotal = 0;
      newScores.map(score => {
        if (parseInt(score.score) || parseInt(score.score) === 0) {
          newTotal += score.score;
        }
        return score;
      });
      newRound.totalScore = newTotal;
      this.setState({ scores: newScores, round: newRound });

    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let formStatus = true;
    const scores = [...this.state.scores];

    for (let i = 0; i < scores.length; i++) {
      if ((parseInt(scores[i].score) || parseInt(scores[i].score) === 0) &&
        (parseInt(scores[i].par) || parseInt(scores[i].par) === 0)) {
        // empty
      } else {
        formStatus = false;
      }
    }
    if (formStatus === true) {
      fetch('/api/rounds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      })
        .then(() => {
          window.location.hash = '#';
        })
        .catch(err => console.error(err));
    } else {
      this.setState({ message: 'All par\'s and score\'s must be filled out with numbers' });
    }
  }

  handleClick(event) {
    if (event.target.id === 'add-hole') {
      const newScores = [...this.state.scores];
      const courseUpdate = Object.assign({}, this.state.course);
      courseUpdate.holes = courseUpdate.holes + 1;
      const bonusHole = {
        holeNumber: courseUpdate.holes,
        par: '',
        score: ''
      };
      newScores.push(bonusHole);
      this.setState({ scores: newScores, course: courseUpdate });
    }
  }

  renderHoles() {
    const scores = [...this.state.scores];
    if (scores !== []) {
      const formHoles = scores.map(score => {
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
            <div className="row button-container m-2">
              <button id="add-hole" type="button" onClick={this.handleClick}>Add Hole</button>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
        <p className="text-center m-2 text-danger">{this.state.message}</p>
      </div>
    );
  }
}
