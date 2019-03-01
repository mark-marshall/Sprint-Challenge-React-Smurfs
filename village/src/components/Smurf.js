import React from 'react';
import PT from 'prop-types';

const Smurf = props => {
  return (
    <div className="Smurf">
      <h3>{props.name}</h3>
      <strong>{props.height} tall</strong>
      <p>{props.age} smurf years old</p>
    </div>
  );
};

Smurf.defaultProps = {
  name: '',
  height: '',
  age: '',
};

export default Smurf;

Smurf.propTypes = {
  age: PT.string.isRequired,
  height: PT.string.isRequired,
  id: PT.number.isRequired,
  name: PT.string.isRequired,
};
