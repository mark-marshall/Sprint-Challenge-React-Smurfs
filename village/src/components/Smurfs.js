import React, { Component } from 'react';
import PT from 'prop-types';
import Smurf from './Smurf';

class Smurfs extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Smurfs">
        <h1>Smurf Village</h1>
        <ul>
          {this.props.smurfs.map(smurf => {
            return (
              <div key={smurf.id}>
                <Smurf
                  name={smurf.name}
                  id={smurf.id}
                  age={smurf.age}
                  height={smurf.height}
                />
                <button
                  value={smurf.id}
                  onClick={event => this.props.deleteSmurf(event)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

Smurf.defaultProps = {
  smurfs: [],
};

export default Smurfs;

Smurfs.propTypes = {
  smurfs: PT.arrayOf(PT.shape({
    age: PT.isRequired,
    height: PT.string.isRequired,
    id: PT.number.isRequired,
    name: PT.string.isRequired
  })).isRequired,
  deleteSmurf: PT.func.isRequired,
}
