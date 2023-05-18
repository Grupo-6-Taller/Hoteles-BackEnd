const { request, response } = require('express')



const esAdminHotel = ( req = request, res= response, next ) =>{

    if (!req.usuario) {
        return res.status(500).json({
            msg : "error del server"
        })
    }
    const {rol, nombre} =req.usuario
    if (rol !== 'HOTEL') {
        return res.status(401).json({
            msg : `${nombre} no es Hotelero no puede hacer eso`
        })
    }
    next()
}

const esAdminRole = ( req = request, res= response, next ) =>{

    if (!req.usuario) {
        return res.status(500).json({
            msg : "error del server"
        })
    }
    const {rol, nombre} =req.usuario
    if (rol !== 'ADMIN') {
        return res.status(401).json({
            msg : `${nombre} no es Admin no puede hacer eso`
        })
    }
    next()
}

module.exports ={
    esAdminRole,
    esAdminHotel

}