const { Router } = require('express');
const { check } = require('express-validator');
const { getHotel, PostHoteles, DeleteHotel, PutHotel, hotelPorNombre, getHabitacionesHotel, usuariosPorHotel} = require('../controllers/HotelController');
const { esAdminRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/mostrar',  getHotel);

router.get('/nombre',  hotelPorNombre);

router.get('/usuarios/:id',  usuariosPorHotel);


router.get('/habitaciones/:id',  getHabitacionesHotel); 

router.post('/agregar',[ 
    validarJWT,
    esAdminRole,
    check('nombre', 'el nombre es obligatorio para agregar').not().isEmpty(),
    check('direccion', 'el password es obligatorio').not().isEmpty(),
    validarCampos
] , PostHoteles);

router.delete('/delete/:id',[
    validarJWT,
    esAdminRole,
    validarCampos
], DeleteHotel);

router.put('/editar/:id',[
    validarJWT,
    esAdminRole,
    check('nombre', 'el nombre es obligatorio para agregar').not().isEmpty(),
    check('direccion', 'el password es obligatorio').not().isEmpty(),
    validarCampos
] ,PutHotel)


module.exports = router;