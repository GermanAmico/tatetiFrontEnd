import React from 'react';
import Square from './Square';
import axios from "axios";

export default class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
        sala:[]
      };
    }
  
    handleClick(i) {
      const squares = this.state.squares.slice();
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
    }
  
    renderSquare(i) {
      return (
        <Square
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
        />
      );
    }

    //Jugador que crea la sala.
    createSala(){
      axios.post('http://25.94.145.147:3001/turn/room/create', {'nombre':'UnaSalaHechaEnReact :D'}).then(response=>{
        console.log("CREAR SALA\n" + response);
        this.setState({sala:response.data});
      }).catch((err)=>{console.log(err)});
    }

    //Despues de hacer click en un cuadrado, hay que actualizar el arreglo y mandarlo al API Rest.
    //Luego hay que esperar la respuesta del jugador utilizando un timer.
    updateSala(){
      
    }

    //Luego del timer hacemos un GET y traemos la sala. Nos va a servir para unirse a la sala tambien.
    getSala(idsala){
      axios.get('http://25.94.145.147:3001/turn/room?idsala='+idsala).then(response => {
        console.log("OBTENEMOS LA SALA CREADA: \n"+response);
        this.setState({sala:response.data});
      });
    }

    componentDidMount(){
        if(this.state.sala.idsala === undefined){
          this.createSala();
        }else{
          if(this.idsala){
          let idsala = this.idsala;
          console.log("idsala en Board: "+idsala);
          this.getSala(idsala);
          }
        }
    }
    render() {
      const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        return (
          <div>
            <div className="status">{status}</div>
            <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
            <div>
        <p>Comparte el ID con un amigo para empezar a jugar: {this.state.sala.idsala}</p>
            </div>
          </div>
        );
    }
  }