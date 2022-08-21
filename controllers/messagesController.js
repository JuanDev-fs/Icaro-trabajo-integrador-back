const message = require('../models/message');

const User = require('../models').User; //sequelize
const Message = require('../models').Message;

let arrayMessage
module.exports = {

    uptdateMessageDb(req,res){
      return Message.update({ read: true }, {
            where: {
              id: req.params.id
            }
        })
    .then(user => res.status(200).send(user))
    .catch(error => res.status(400).send(error))

    },


    testeo(req,res){
        return User.findAll({
                /* attributes:{
                    
                }, */
                /*where: {
                  receiverId: 2
                }, */
                include: [{
                    model: Message,
                    as:"mensajeEscrito",
                    where:{senderId:1/* receiverId:4 */},
                    include:[{
                        model:User,
                        as:'destinatario',
                        attributes:['id','username']
                    }],
                    attributes:['id','text','read','createdAt']
                }],
                attributes:['id','username'] 
        })
        .then(user => res.status(200).send(user))
		.catch(error => res.status(400).send(error))
    },

    createMessageDb(req,res){
        arrayMessage=req.body
        console.log(arrayMessage);
        return Message.bulkCreate(arrayMessage)
        .then(user => res.status(200).send(user))
		.catch(error => res.status(400).send(error))
    },

    findAllMessagesReceived(req,res){
        return User.findOne({
            where:{
                username : req.params.username
            }})
        .then((data)=>{
            let receiverId = data.dataValues.id
            // return Message.findAll({
            //     include: [{
            //         model: User,
            //         as:"destinatario",
            //         //where:{receiverId:receiverId},
            //         /* include:[{
            //             model:User,
            //             as:'destinatario',
            //             attributes:['id','username']
            //         }], */
            //         attributes:['id','username']
                    
            //     }],
            //     attributes:['id','text','read'],
            //     where:{receiverId:receiverId}
            // })


            return User.findAll({
                order:[["mensajeEscrito",'createdAt','DESC']],
                include: [{
                    model: Message,
                    as:"mensajeEscrito",
                    where:{receiverId:receiverId},
                    include:[{
                        model:User,
                        as:'destinatario',
                        attributes:['id','username']
                    }],
                    attributes:['id','text','read','createdAt'],
                    //where:{receiverId:receiverId}
                    
                    
                }],
                attributes:['id','username'] 
            })
        })   
    .then(user => res.status(200).send(user))
    .catch(error => res.status(400).send(error))
    },

    findAllMemosSent(req,res){
        return User.findOne({
            where:{
                username : req.params.username
            }})
        .then((data)=>{
            let senderId = data.dataValues.id
            return User.findAll({
                order:[["mensajeEscrito",'createdAt','DESC']],
                include: [{
                    model: Message,
                    as:"mensajeEscrito",
                    where:{senderId:senderId},
                    include:[{
                        model:User,
                        as:'destinatario',
                        attributes:['id','username']
                    }],
                    attributes:['id','text','read','createdAt']
                }],
                attributes:['id','username'] 
            })
        })   
    .then(user => res.status(200).send(user))
    .catch(error => res.status(400).send(error))
    }
}



/* 

select users.username as Enviado ,messages.text,messages.read,us.username as Destinatario
from users
	inner join messages on users.id = messages.senderId
			inner join users us on us.id = messages.receiverId
            where us.id=4;

*/



//Rehaciendo las consultas 04/08/2022 con base de datos courier2

/* 
//Funciona me da los mensajes recibidos por el usuario de id 5, no me da el nombre de usuario que lo envia
//funciona para el tipo de asocioacion 001

testeo(req,res){
        return Message.findAll({
                where: {
                  receiverId: 5
                },
                include: [{
                    model: User,
                    as: 'destinatario'
                }] 
        })
        .then(user => res.status(200).send(user))
		.catch(error => res.status(400).send(error))
    }

*/

//Funciona da todos los mensajes enviados por el usuario de id =2, une las tres tablas.
//funciona para el tipo de asocioacion 001
/* 

testeo(req,res){
        return User.findAll({
                attributes:{

                },
                where: {
                  id: 2
                },
                include: [{
                    model: Message,
                    include:[{
                        model:User,
                        as:'destinatario'
                    }]
                }] 
        })
        .then(user => res.status(200).send(user))
		.catch(error => res.status(400).send(error))
    }

*/