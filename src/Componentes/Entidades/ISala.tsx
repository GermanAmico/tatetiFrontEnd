export class ISala{
    idsala: String ="";
    nombre: String="";
    jugadas: Ijugada= new Ijugada();
}

class Ijugada{
    tateti:String[] = [];
    TurnoJugador1:Boolean = true;
    TurnoJugador2:Boolean = false;
    jugadas:Number = 0;
    ganador:String = "";
}

/*

 var Tateti = ["","","","","","","","",""];

    var jugada = {
        'tateti' : Tateti,
        'TurnoJugador1': true,
        'TurnoJugador2': false,
        'jugadas': 0,
        'ganador':"",
    };
    var sala = {
        'idsala':"",
        'nombre':"",
        'jugada': jugada,
    };

*/