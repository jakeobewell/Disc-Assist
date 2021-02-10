import React from 'react';

export default class EditCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseName: '',
      city: '',
      holes: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

}
