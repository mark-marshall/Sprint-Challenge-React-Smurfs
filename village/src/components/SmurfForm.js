import React, { Component } from 'react';
import PT from 'prop-types';
import styled from 'styled-components';

const SmurfFormWrap = styled.form`
  width: 15%;
  height: 250px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  input {
    margin: 5px;
    height: 35px;
    border: 1px solid #62cdfd;
    border-radius: 2px;
    padding: 2%;
  }

  button {
    color: white;
    font-size: 14px;
    border: 1px solid #62cdfd;
    background-color: #62cdfd;
    height: 35px;
    border-radius: 2px;
    margin: 5px;
    cursor: pointer;

    &:hover {
      background-color: red;
      color: #62cdfd;
    }
  }
`;

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
      id: this.props.smurfs.length,
    });
    // add code to create the smurf using the api
    this.props.addSmurf(this.state);

    this.setState({
      name: '',
      age: '',
      height: '',
      id: '',
    });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="SmurfForm">
        <SmurfFormWrap onSubmit={this.addSmurf}>
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.name}
            name="Name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="Age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="Height"
          />
          <button type="submit">Add to the village</button>
        </SmurfFormWrap>
      </div>
    );
  }
}

export default SmurfForm;

SmurfForm.propTypes = {
  smurfs: PT.arrayOf(
    PT.shape({
      age: PT.number.isRequired,
      height: PT.string.isRequired,
      id: PT.number.isRequired,
      name: PT.string.isRequired,
    }),
  ).isRequired,
  addSmurf: PT.func.isRequired,
};
