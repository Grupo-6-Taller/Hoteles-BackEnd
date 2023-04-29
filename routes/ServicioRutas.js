const { Router } = require('express');
const { check } = require('express-validator');
const { GetSerevicio, DeleteSerevicio, PostSerevicio, PutSerevicio} = require('../controllers/ServicioController');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/mostrar', GetSerevicio);

router.post('/agregar',[
    validarJWT,
    validarCampos
] , PostSerevicio);

router.delete('/delete/:id', DeleteSerevicio);

router.put('/editar/:id', PutSerevicio)


module.exports = router;