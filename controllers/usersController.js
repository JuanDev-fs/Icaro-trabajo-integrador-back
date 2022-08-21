const User = require('../models').User; //sequelize
const bcrypt = require('bcrypt')

//JWT
const jwt = require('jsonwebtoken')
const keys = require('../settings/keys')


module.exports = {



	//TRAE TODOS LOS USUARIOS DE LA TABLA USER, pero solo muestra los campos declarados dentro de attributes
	findAll(_req, res) {
		return User
			.findAll({
				attributes: ['id', 'firstName', 'lastName', 'username', 'country', 'city']
			})
			.then(user => res.status(200).send(user))
			.catch(error => res.status(400).send(error))
	},

	//Crea usuario en db si no existe el username
	create(req, res) {
		return User.findOrCreate({
			where: {
				username: req.body.username
			},
			defaults: {
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				password: bcrypt.hashSync(req.body.password, 10),
				country: req.body.country,
				city: req.body.city
			}
		})
			.then(([createduser, created]) => {
				let data = createduser

				if (created) {
					console.log('usuario creado?', created)
					console.log('usuario creado con exito');
					return res.status(201).send(data)
				} else {
					console.log('usuario ya existe');
					console.log('usuario creado?', created)
					return res.status(400).send('Usuario ya existe')
				}

			})
	},

	//login usuario, busca si existe el username, luego verifica pass, crea token y envia al front
	login(req, res) {
		return User.findOne({
			where: { username: req.body.username }
		})
			.then((data) => {
				userFound = data
				if (!data) {
					console.log('No existe el usuario');
					return res.status(400).send('No existe el usuario')
				}
				hash = userFound.dataValues.password;
				password = req.body.password

				if (userFound && bcrypt.compareSync(password, hash)) {
					console.log('Login exitoso');

					let payload = {
						username: userFound.dataValues.username
					}

					console.log(payload);
					const token = jwt.sign(payload, keys.key, { expiresIn: '1d' })

					return res.status(200).send({
						message: 'Autenticacion exitosa',
						token: token
					})
				} else {
					console.log('Fallo login, existe usuario pero password incorrecto');
					return res.status(400).send('error login')
				}
			})
			.catch(error => res.status(400).send(error))
	}
}

