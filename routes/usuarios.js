const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarToken } = require('../middlewares/validar-jwt');

const router = Router();

const {
  getUsuario,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
  getUsuarioById,
  getUsuarios,
  getUsuariosAdmin,
  cambiarPassword,
  actualizarFirebaseTokenUsuario,
  enviarUnaNotificacionContratar
} = require('../controllers/usuario');


router.get('/notificacion-contratar/:idUsuario/pushed/:tituloOferta/:tipoNotificacion', enviarUnaNotificacionContratar);


router.get('/', getUsuario);

router.get('/:id', getUsuarioById);

router.get('/obtener/usuarios', getUsuarios);
router.get('/obtener/usuarios/:id', getUsuariosAdmin);

router.post('/validar/token', validarToken);

router.post(
  '/',
  [
    check('nombres', 'Los nombres es obligatorio').not().isEmpty(),
    // check('password', 'El pass es obligatorio').not().isEmpty(),
    // check('email', 'El email es obligatorio').isEmail(),
    validarCampos,
  ],
  crearUsuario
);

router.put('/:id', [validarJWT, validarCampos], actualizarUsuario);
//ACTUALIZAR TOKEN DEL USUARIO OBTENIDO DE FCM
router.put('/actualizartoken-firebase/usuario/:id', validarJWT, actualizarFirebaseTokenUsuario);

router.put('/cambio/:id',[validarJWT], cambiarPassword);

router.delete('/:id', validarJWT, borrarUsuario);

module.exports = router;
