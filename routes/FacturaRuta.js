const { Router } = require('express');
const { check } = require('express-validator');
const {generarFactura, getFacturaId } = require('../controllers/FacturaController');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// router.get('/mostrar', GetHabitacion);

router.post('/generar/:id',[
    validarJWT
] ,generarFactura);


router.get('/mostrar/:id',[
    validarJWT
] ,generarFactura);

// router.delete('/delete/:id', DeleteHabitacion);

// router.put('/editar/:id', PutHabitacion)


module.exports = router;