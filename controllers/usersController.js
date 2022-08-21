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
				attributes: ['id', 'firstName', 'lastName','username','country','city']
			  })
			.then(user => res.status(200).send(user))
			.catch(error => res.status(400).send(error))
	},

	create(req,res){
		return User.findOrCreate({
			where:{
				username:req.body.username
			},
			defaults:{
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				password: bcrypt.hashSync(req.body.password,10),
                country:req.body.country,
                city:req.body.city
			}
			})
			.then(([createduser,created]) => {
				let data = createduser

				if(created){
					console.log('usuario creado?',created)
					console.log('usuario creado con exito');
					return res.status(201).send(data)
				} else {
					console.log('usuario ya existe');
					console.log('usuario creado?',created)
					return res.status(400).send('Usuario ya existe')
				}
				
				//console.log(data)
			})
			/* .then(user => res.status(201).send(user))
			.catch(error => res.status(400).send(error)) */
	},
	login(req,res){
		return User.findOne({
			where:{username:req.body.username}
		})
		.then((data)=>{
			userFound = data
			//console.log(userFound);
			if(!data){
				console.log('No existe el usuario');
				return res.status(400).send('No existe el usuario')
			}
			hash =userFound.dataValues.password;
			password = req.body.password
			
			if(userFound && bcrypt.compareSync(password,hash)){
				console.log('Login exitoso');

				let payload ={
					username:userFound.dataValues.username
				}

				console.log(payload);
				const token = jwt.sign(payload,keys.key,{expiresIn:'1d'})


				//sesiones y cookies
				session=req.session;
            	session.userid=req.body.username;

				//tambien funciona de enviarlo de esta forma
				/* res.json({
					message:'Autenticacion exitosa',
					token:token
				}) */

				return res.status(200).send({
					message:'Autenticacion exitosa',
					token:token
				})
				//return res.status(200).send(data)//aca envio data entero, incluido el password NO ENVIARRR
			} else {
				console.log('Fallo login, existe usuario pero password incorrecto');
				return res.status(400).send('error login')
			}	
		})
		//.then(user => res.status(200).send(user))
		.catch(error => res.status(400).send(error))
	}
}

//

/**
 * 
 * const [user, flag] = await User.findOrCreate({
 * 
 * 
 * findOrFail
 * 
 * 
 * if (no encuentro el usuario)
lo agrego
create
return res.json(201) blabla
else
return res.json(400, 'error'=
)
 */



//Login con session
/* login(req,res){
	return User.findOne({
		where:{username:req.body.username}
	})
	.then((data)=>{
		userFound = data
		console.log(userFound);
		if(!data){
			console.log('No existe el usuario');
			return res.status(400).send('No existe el usuario')
		}
		hash =userFound.dataValues.password;
		password = req.body.password
		if(userFound && bcrypt.compareSync(password,hash)){
			console.log('Login exitoso');
			session=req.session;
			session.userid=req.body.username;
			return res.status(200).send(data)//aca envio data entero, incluido el password NO ENVIARRR
		} else {
			console.log('Fallo login');
			return res.status(400).send('error login')
		}	
	})
	//.then(user => res.status(200).send(user))
	.catch(error => res.status(400).send(error))
} */