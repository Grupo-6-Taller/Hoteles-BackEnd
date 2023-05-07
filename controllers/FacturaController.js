const { response, request } = require('express');

const Factura = require('../models/FacturaModel');
const Reservacion = require('../models/ReservacionModel');

const generarFactura =  async (req = request, res = response)  => {
    const reservacionId = req.reservacion._id
    const data = req.body
    const reservacion = await Reservacion.findOne({_id: reservacionId})

    const params = {
        reservacion: reservacionId,
        total: reservacion.total,
        fecha: Date.now()
    }


    const factura = new Factura(params)
    const nuevaFactura = await factura.save()

    const miFactura = await Factura.findById({_id: nuevaFactura._id})
 
  

    res.json({
        msg: 'Get Api de evento',
        miFactura
    })

}

module.exports  = {
    generarFactura
}
