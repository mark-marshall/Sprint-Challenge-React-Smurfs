import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

const HeaderWrapper = styled.nav`
 margin: 18px 0;
 height: 50px;
 background-color: #62CDFD;
 display: flex;
 align-items: center;
 justify-content: center;

 a {
   color: red;
   text-decoration: none;
   text-transform: lowercase;
   font-size: 18px;
   padding: 1%;

   &:hover {
    color: white;
   }
 }
`;

const smurfUrl = 'http://localhost:3333/smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      error: '',
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    axios
      .get(smurfUrl)
      .then(smurfs => this.updateSmurfs(smurfs.data))
      .catch(error => this.updateErrors(error.message));
  }

  componentDidUpdate() {
    axios
      .get(smurfUrl)
      .then(smurfs => this.updateSmurfs(smurfs.data))
      .catch(error => this.updateErrors(error.message));
  }

  addSmurf = smurf => {
    axios
      .post(smurfUrl, smurf)
      .then(() => this.addToSmurfsList(smurf))
      .catch(error => this.updateErrors(error.message));
  };

  deleteSmurf = event => {
    axios
      .delete(`${smurfUrl}/${event.target.value}`)
      .then(smurfs => this.updateSmurfs(smurfs.data))
      .catch(error => this.updateErrors(error.message));
  };

  updateSmurfs = smurfs => {
    this.setState({ smurfs });
  };

  updateErrors = error => {
    this.setState({ error });
  };

  addToSmurfsList = smurf => {
    this.setState(prevState => ({
      smurfs: prevState.smurfs.concat(smurf),
    }));
  };

  render() {
    if (this.state.error) {
      return <h1>Oh Smurf. We have a problem: {this.state.error}</h1>;
    }
    return (
      <div className="App">
        <HeaderWrapper>
          <NavLink to="/">Smurfs</NavLink>
          <NavLink to="/smurf-form">Smurf Form</NavLink>
        </HeaderWrapper>
        <Route
          exact
          path="/"
          render={() => (
            <Smurfs
              smurfs={this.state.smurfs}
              deleteSmurf={this.deleteSmurf}
            />
          )}
        />
        <Route
          path="/smurf-form"
          render={() => (
            <SmurfForm smurfs={this.state.smurfs} addSmurf={this.addSmurf} />
          )}
        />
      </div>
    );
  }
}

export default App;
