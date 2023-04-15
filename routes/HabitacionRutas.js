const { Router } = require('express');
const { check } = require('express-validator');
const { GetHabitacion, PostHabitacion, PutHabitacion, DeleteHabitacion,} = require('../controllers/HabitacionController');

const router = Router();

router.get('/mostrar', GetHabitacion);

router.post('/agregar', PostHabitacion);

router.delete('/delete/:id', DeleteHabitacion);

router.put('/editar/:id', PutHabitacion)


module.exports = router;