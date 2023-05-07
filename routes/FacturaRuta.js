const { Router } = require('express');
const { check } = require('express-validator');
const {generarFactura } = require('../controllers/FacturaController');

const router = Router();

// router.get('/mostrar', GetHabitacion);

router.post('/generar/:id', generarFactura);

// router.delete('/delete/:id', DeleteHabitacion);

// router.put('/editar/:id', PutHabitacion)


module.exports = router;