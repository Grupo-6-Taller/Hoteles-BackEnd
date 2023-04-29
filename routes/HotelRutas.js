const { Router } = require('express');
const { check } = require('express-validator');
const { getHotel, PostHoteles, DeleteHotel, PutHotel} = require('../controllers/HotelController');
const { esAdminRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/mostrar',  getHotel);

router.post('/agregar',[ 
    validarJWT,
    esAdminRole,
    validarCampos
] , PostHoteles);

router.delete('/delete/:id', DeleteHotel);

router.put('/editar/:id', PutHotel)


module.exports = router;