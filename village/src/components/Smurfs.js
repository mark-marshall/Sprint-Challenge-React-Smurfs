import React, { Component } from 'react';
import PT from 'prop-types';
import styled from 'styled-components';

import Smurf from './Smurf';

const HeaderWrap = styled.h1`
  text-transform: uppercase;
`;

const SmurfWrapper = styled.div`
  width: 1000px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: sapce-between;

  button {
    background-color: white;
    border: 1px solid white;
    width: 66%;
    height: 20%;
    cursor: pointer;
    border-radius: 2px;

    &:hover {
      background-color: red;
      color: white;
      font-size: 13px;
      font-weight: bold;
    }
  }
`;

const SmurfCard = styled.div`
  padding-top: 20px;
  font-size: 16px;
  height: 200px;
  width: 300px;
  margin: 10px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:hover {
    background-color: #62cdfd;
    color: white;
  }
`;

class Smurfs extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <HeaderWrap>Smurf Village</HeaderWrap>
        <SmurfWrapper>
          {this.props.smurfs.map(smurf => {
            return (
              <SmurfCard key={smurf.id}>
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
              </SmurfCard>
            );
          })}
        </SmurfWrapper>
      </div>
    );
  }
}

Smurf.defaultProps = {
  smurfs: [],
};

export default Smurfs;

Smurfs.propTypes = {
  smurfs: PT.arrayOf(
    PT.shape({
      age: PT.string.isRequired,
      height: PT.string.isRequired,
      id: PT.isRequired,
      name: PT.string.isRequired,
    }),
  ).isRequired,
  deleteSmurf: PT.func.isRequired,
};
