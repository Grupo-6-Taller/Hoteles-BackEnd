const { Router } = require('express');
const { check } = require('express-validator');
const { getHotel, PostHoteles, DeleteHotel, PutHotel} = require('../controllers/HotelController');

const router = Router();

router.get('/mostrar', getHotel);

router.post('/agregar', PostHoteles);

router.delete('/delete/:id', DeleteHotel);

router.put('/editar/:id', PutHotel)


module.exports = router;