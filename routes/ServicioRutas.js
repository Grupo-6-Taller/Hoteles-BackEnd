const { Router } = require('express');
const { check } = require('express-validator');
const { GetReservacion, DeleteReservacion, PostReservacion, PutReservacion} = require('../controllers/ReservacionController');

const router = Router();

router.get('/mostrar', GetReservacion);

router.post('/agregar', PostReservacion);

router.delete('/delete/:id', DeleteReservacion);

router.put('/editar/:id', PutReservacion)


module.exports = router;