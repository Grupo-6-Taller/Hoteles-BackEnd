const { Router } = require('express');
const { check } = require('express-validator');
const { GetReservacion, DeleteReservacion, PostReservacion, PutReservacion, PostServicio} = require('../controllers/ReservacionController');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/mostrar', GetReservacion);

router.post('/agregar',[
    validarJWT,
    validarCampos
], PostReservacion);

router.post('/agregarServicio/:_id',[
    validarJWT,
    validarCampos
] ,PostServicio);

router.delete('/delete/:id', DeleteReservacion);

router.put('/editar/:id', PutReservacion)


module.exports = router;