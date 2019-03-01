import React, { Component } from 'react';
import PT from 'prop-types';

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      height: '',
      id: '',
    };
  }

  addSmurf = event => {
    event.preventDefault();
    this.setState({
      id: this.props.smurfs.length
    })
    // add code to create the smurf using the api
    this.props.addSmurf(this.state)

    this.setState({
      name: '',
      age: '',
      height: '',
      id: '',
    });
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="SmurfForm">
        <form onSubmit={this.addSmurf}>
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="height"
          />
          <button type="submit">Add to the village</button>
        </form>
      </div>
    );
  }
}

export default SmurfForm;

SmurfForm.propTypes = {
  smurfs: PT.arrayOf(PT.shape({
    age: PT.isRequired,
    height: PT.string.isRequired,
    id: PT.isRequired,
    name: PT.string.isRequired
  })).isRequired,
  addSmurf: PT.func.isRequired,
}
