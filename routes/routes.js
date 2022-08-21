const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');

const usersController = require('../controllers/usersController')
const messagesController = require('../controllers/messagesController')
const authController = require('../controllers/authController')

//LOGIN
router.post('/api/login', usersController.login)

//TRAER TODOS LOS USUARIOS EXISTENTES
router.get('/api/users', authController.ensureToken, authController.verification, usersController.findAll)

//CREAR USUARIO
//Antes de crear usuario valida las entradas del body con express validator
router.post('/api/users',
    body('username', 'ingrese un nombre de usuario valido').isLength({ min: 5 }),
    body('firstName', 'ingrese un nombre valido').isLength({ min: 3 }).isAlpha('en-US', { ignore: [' ', 'ñ', 'Ñ', 'á', 'é', 'í', 'ó', 'ú', 'Á', 'É', 'Í', 'Ó', 'Ú', 'ã', '’', 'ô'] }),
    body('lastName', 'ingrese un apellido valido').isLength({ min: 3 }).isAlpha('en-US', { ignore: [' ', 'ñ', 'Ñ', 'á', 'é', 'í', 'ó', 'ú', 'Á', 'É', 'Í', 'Ó', 'Ú', 'ã', '’', 'ô'] }),
    body('country', 'ingrese un pais valido').isLength({ min: 3 }).isAlpha('en-US', { ignore: [' ', 'ñ', 'Ñ', 'á', 'é', 'í', 'ó', 'ú', 'Á', 'É', 'Í', 'Ó', 'Ú', 'ã', '’', 'ô', '-'] }),
    body('city', 'ingrese una ciudad valida').isLength({ min: 3 }).isAlpha('en-US', { ignore: [' ', 'ñ', 'Ñ', 'á', 'é', 'í', 'ó', 'ú', 'Á', 'É', 'Í', 'Ó', 'Ú', 'ã', '’', 'ô', '-'] }),
    body('password', 'ingrese un password valido').isLength({ min: 8 }),
    (req, res) => {
        const errors = validationResult(req);
        console.log(errors);
        /////
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //////
        usersController.create(req, res, errors)
    }

)

//TRAER TODOS LOS MENSAJES que rebibio un username especifico
router.get('/api/users/:username/messages/inbox', authController.ensureToken, authController.verification, messagesController.findAllMessagesReceived)

//TRAE LOS MENSAJE ENVIADOS POR UN USUARIO con username
router.get('/api/users/:username/messages/sent', authController.ensureToken, authController.verification, messagesController.findAllMemosSent)

//ENVIA UN MENSAJE A N DESTINATARIOS
router.post('/api/users/:username/messages', authController.ensureToken, authController.verification, messagesController.createMessageDb)

//MODIFICAR ESTADO DE LECTURA DEL MENSAJE
router.put('/api/users/:username/messages/:id', authController.ensureToken, authController.verification, messagesController.uptdateMessageDb)


module.exports = router


//ensureToken y verification asegura que no se pueda acceder a la ruta si no tiene un token valido.


