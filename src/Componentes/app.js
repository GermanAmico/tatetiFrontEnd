import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect

  } from "react-router-dom";

  import Game from './Game';

export default class App extends React.Component{

    constructor(props){
      super(props);
      this.state={
        idsala : '',
        irsala : false,
        ensala: false
      }
      this.handleChange = this.handleChange.bind(this);
      this.redirigirSala = this.redirigirSala.bind(this);
    }

    handleChange(event) {
        this.setState({idsala: "/sala/"+event.target.value});
        
        console.log(this.state.idsala);
      }
    redirigirSala(event){
        this.setState({irsala: true, jugador2: true, ensala: true});
    }
    render(){
      console.log(this.props);
        return(
          <Router>
            <nav>
              <ul>
                <li>
                  <Link to="/">Inicio</Link>
                </li>
                <li>
                  <Link to="/sala/crear">Nueva partida</Link>
                </li>
              </ul>
              </nav>
              <Route path="/">
                <h1>Tateti inicio</h1>
              </Route>
              <Route path="/sala/crear" component={Game}/>
            </Router>
        );     
    }

    formularioSala(){
      return(
        <div>
          <h3>Unirse a una partida existente.</h3>
          <p>Solicita a un amigo tuyo el ID de la sala creada.</p>
            <input type="text" id="idsala" name="idsala" onChange={this.handleChange}/>
            <input type="button" value="Unirse" onClick={this.redirigirSala}></input>
        </div>
      );
    }
}