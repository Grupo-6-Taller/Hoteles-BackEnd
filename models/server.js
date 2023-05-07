const express = require('express')
const cors = require('cors');

const { dbConection } = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths ={
            usuario :"/api/usuario",
            hotel: "/api/hotel",
            habitacion: "/api/habitacion",
            login: "/api/auth",
            evento: "/api/evento",
            servicio: "/api/servicio",
            reservacion: "/api/reservacion",
            tipo: "/api/tipo",
            factura: "/api/factura"
        }


        this.conectarDB();

        this.middlewares();

        this.routes();

    }

    async conectarDB(){
        await dbConection();
    }

    middlewares(){
        //cors
        this.app.use(cors());
        //lECTURA Y PARSEO DEL BODY
        this.app.use( express.json());    
        //Directorio publico del Proyecto
        this.app.use( express.static('public'));
        
    }

    routes(){
        this.app.use(this.paths.usuario , require('../routes/UsuarioRutas'))
        this.app.use(this.paths.hotel , require('../routes/HotelRutas'))
        this.app.use(this.paths.habitacion , require('../routes/HabitacionRutas'))
        this.app.use(this.paths.login , require('../routes/auth'))
        this.app.use(this.paths.evento , require('../routes/EventoRutas'))
        this.app.use(this.paths.servicio , require('../routes/ServicioRutas'))
        this.app.use(this.paths.reservacion , require('../routes/ReservacionRutas'))
        this.app.use(this.paths.tipo , require('../routes/TipoEventoRutas'))
        this.app.use(this.paths.factura , require('../routes/FacturaRuta'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)

        })
    }
}
module.exports = Server;