import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

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
      .get('http://localhost:3333/smurfs')
      .then(smurfs => this.updateSmurfs(smurfs.data))
      .catch(error => this.updateErrors(error.message));
  }

  addSmurf = smurf => {
    axios
      .post('http://localhost:3333/smurfs', smurf)
      .then(() => this.addToSmurfsList(smurf))
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
    return (
      <div className="App">
        <nav>
          <NavLink to="/">Smurfs</NavLink>
          <NavLink to="/smurf-form">Smurf Form</NavLink>
        </nav>
        <Route
          path="/smurf-form"
          render={() => (
            <SmurfForm smurfs={this.state.smurfs} addSmurf={this.addSmurf} />
          )}
        />
        <Route
          exact
          path="/"
          render={() => <Smurfs smurfs={this.state.smurfs} />}
        />
      </div>
    );
  }
}

export default App;
