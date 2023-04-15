const { Router } = require('express');
const { check } = require('express-validator');

const { PostUsuarios, GetUsuarios, DeleteUsuarios, PutUsuarios} = require('../controllers/UsuarioController');

const router = Router();

router.get('/mostrar', GetUsuarios);

router.post('/agregar', PostUsuarios);

router.put('/editar/:id', PutUsuarios);

router.delete('/delete/:id', DeleteUsuarios)


module.exports = router;