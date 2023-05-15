const { response, request } = require('express');

const Factura = require('../models/FacturaModel');
const Reservacion = require('../models/ReservacionModel');

const generarFactura = async (req = request, res = response) => {
     const reservacionId = req.params.id
    
      const reservacion = await Reservacion.findOne({ _id: reservacionId })
      console.log(reservacion)
          const params = {
          reservacion: reservacionId,
          usuario: reservacion.usuario,
          habitacion: reservacion.habitacion,
          servicio: reservacion.servicio,
          fecha: Date.now(),
          total: reservacion.total
          
      }
      const factura = new Factura(params)
      const nuevaFactura = await factura.save()
     const miFactura = await Factura.findById({ _id: nuevaFactura._id })
     

     res.json({
         msg: 'Gracias por Comprar',
         miFactura 
     })

}

module.exports = {
    generarFactura
}
