const { Router } = require('express');
const { check } = require('express-validator');
const { getHotel, PostHoteles, DeleteHotel, PutHotel, hotelPorNombre} = require('../controllers/HotelController');
const { esAdminRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/mostrar',  getHotel);

router.get('/nombre',  hotelPorNombre);

router.post('/agregar',[ 
    validarJWT,
    esAdminRole,
    check('nombre', 'el nombre es obligatorio para agregar').not().isEmpty(),
    check('direccion', 'el password es obligatorio').not().isEmpty(),
    check('evento', 'la contrase;a minimo tienen que ser 6 caracteres').isLength({ min: 6 }),
    validarCampos
] , PostHoteles);

router.delete('/delete/:id', DeleteHotel);

router.put('/editar/:id',[
    validarJWT,
    esAdminRole,
    check('nombre', 'el nombre es obligatorio para agregar').not().isEmpty(),
    check('direccion', 'el password es obligatorio').not().isEmpty(),
    check('evento', 'la contrase;a minimo tienen que ser 6 caracteres').isLength({ min: 6 }),
    validarCampos
] ,PutHotel)


module.exports = router;