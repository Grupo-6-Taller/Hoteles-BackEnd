const { Router } = require('express');
const { check } = require('express-validator');
const { PostUsuarios, GetUsuarios, DeleteUsuarios, PutUsuarios, borrarCliente, PutCliente, PostCliente} = require('../controllers/UsuarioController');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');
const { emailExiste, esRoleValido } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { existIdOfUser } = require('../helpers/db-validators');

const router = Router();

router.get('/mostrar', GetUsuarios);

router.post('/agregar', [
    validarJWT,
    esAdminRole,
    check('nombre', 'el nombre es obligatorio para agregar').not().isEmpty(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    check('password', 'la contrase;a minimo tienen que ser 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es correcto').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),
    validarCampos
] ,  PostUsuarios);

router.put('/editar/:id',[
    validarJWT,
    esAdminRole,
    check('nombre', 'el nombre es obligatorio para agregar').not().isEmpty(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    check('password', 'la contrase;a minimo tienen que ser 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es correcto').isEmail(),
    check('rol').custom(esRoleValido),
    check('id').custom(existIdOfUser),
    check('id', "no es un id valido").isMongoId(),  
    check('correo', 'El correo no es correcto').isEmail(),
    check('correo').custom(emailExiste),
    validarCampos
], PutUsuarios);

router.delete('/delete/:id',[
    validarJWT,
    esAdminRole,
    check('id').custom(existIdOfUser),
    check('id', "id de mongo no existe").isMongoId(), 
    validarCampos
] , DeleteUsuarios)

router.post('/agregarCliente', [
    check('nombre', 'el nombre es obligatorio para agregar').not().isEmpty(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    check('password', 'la contrase;a minimo tienen que ser 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es correcto').isEmail(),
    check('correo').custom(emailExiste),
    validarCampos
], PostCliente);

router.delete('/deleteCuenta/:id', [
    validarJWT,
    check('id').custom(existIdOfUser),
    check('id', "id de mongo no existe").isMongoId(),

    validarCampos
], borrarCliente)

router.put('/editar/:id', [
    validarJWT,
    check('nombre', 'el nombre es obligatorio para agregar').not().isEmpty(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    check('password', 'la contrase;a minimo tienen que ser 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es correcto').isEmail(),
    check('rol').custom(esRoleValido),
    check('id').custom(existIdOfUser),
    check('id', "id de mongo no existe").isMongoId(),
    check('correo', 'El correo no es correcto').isEmail(),
    check('correo').custom(emailExiste),
    validarCampos
], PutCliente);

module.exports = router;