import React from 'react';
import Board from './Board';

export default class Game extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props);
    this.state = {
      idsala : this.props.idsala,
    }
  }
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board idsala={this.props.idsala}/>
          </div>
          <div className="game-info">
          </div>
        </div>
      );
    }
  }