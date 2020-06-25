import React,{useState, useEffect} from 'react';
import Square from './Square';
import axios from "axios";

import {ISala} from "./Entidades/ISala";

export function Board(props:any){
    let [squares,setSquares]= useState(Array(9).fill(null));
    let [xIsNext,setXIsNext]= useState(true);
    let [sala,setSala]= useState([]);
    let [idsala, setIdsala] = useState("");

    let handleClick=(i:number)=> {
      let squareCont = squares.slice();
      squareCont[i] = xIsNext ? 'X' : 'O';
      setSquares(squareCont);
      setXIsNext(!xIsNext);
    }

    let renderSquare=(i:number)=> {
      return (
        <Square
          value={squares[i]}
          onClick={() => handleClick(i)}
        />
      );
    }

 
    //Jugador que crea la sala.

    const createSala = () =>{
      axios.post('http://25.94.145.147:3001/turn/room/create', {'nombre':'UnaSalaHechaEnReact :D'}).then(response=>{
        console.log("CREAR SALA\n" + response);
        setSala(response.data);
      }).catch((err)=>{console.log(err)});
    }

    /*
    //Despues de hacer click en un cuadrado, hay que actualizar el arreglo y mandarlo al API Rest.
    //Luego hay que esperar la respuesta del jugador utilizando un timer.
    const updateSala = () => {
      
    }
    */

    //Luego del timer hacemos un GET y traemos la sala. Nos va a servir para unirse a la sala tambien.
    const getSala= (idsala:any)=>{
      axios.get('http://25.94.145.147:3001/turn/room?idsala='+idsala).then(response => {
        setSala(response.data)
      });
    }


    useEffect(() => {
      let href =  window.location.href;
      console.log(sala);
      if(href.includes("/sala/crear") && sala === undefined){
        console.log("ID SALA VACIO, CREAMOS UNA PARTIDA!");
        createSala();
      }
      if(href.includes("/sala/unirse") && sala === undefined){
        console.log("ID SALA VACIO, CREAMOS UNA PARTIDA!");
        getSala(props.value);
      }
    });

    const status = 'Next player: ' + (xIsNext ? 'X' : 'O');

        return(
          <div>
            <div className="status">{status}</div>
            <div className="board-row">
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </div>
            <div className="board-row">
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </div>
            <div className="board-row">
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </div>
            <div>
        <p>Comparte el ID con un amigo para empezar a jugar:  </p>
            </div>
          </div>
        );
}