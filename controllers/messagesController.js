const message = require('../models/message');

const User = require('../models').User; //sequelize
const Message = require('../models').Message;

let arrayMessage
module.exports = {
    //actualiza estado de lecura del mensaje
    uptdateMessageDb(req, res) {
        return Message.update({ read: true }, {
            where: {
                id: req.params.id
            }
        })
            .then(user => res.status(200).send(user))
            .catch(error => res.status(400).send(error))

    },

    //crea mensaje en db, con senderId, receiverId, text
    createMessageDb(req, res) {
        arrayMessage = req.body
        return Message.bulkCreate(arrayMessage)
            .then(user => res.status(200).send(user))
            .catch(error => res.status(400).send(error))
    },

    //devuelve todos los mensajes recibidos segun el username-->id obtenido del params
    findAllMessagesReceived(req, res) {
        return User.findOne({
            where: {
                username: req.params.username
            }
        })
            .then((data) => {
                let receiverId = data.dataValues.id
                return User.findAll({
                    order: [["mensajeEscrito", 'createdAt', 'DESC']],
                    include: [{
                        model: Message,
                        as: "mensajeEscrito",
                        where: { receiverId: receiverId },
                        include: [{
                            model: User,
                            as: 'destinatario',
                            attributes: ['id', 'username']
                        }],
                        attributes: ['id', 'text', 'read', 'createdAt'],
                    }],
                    attributes: ['id', 'username']
                })
            })
            .then(user => res.status(200).send(user))
            .catch(error => res.status(400).send(error))
    },

    //devuelve todos los mensajes enviados segun el username-->id obtenido del params
    findAllMemosSent(req, res) {
        return User.findOne({
            where: {
                username: req.params.username
            }
        })
            .then((data) => {
                let senderId = data.dataValues.id
                return User.findAll({
                    order: [["mensajeEscrito", 'createdAt', 'DESC']],
                    include: [{
                        model: Message,
                        as: "mensajeEscrito",
                        where: { senderId: senderId },
                        include: [{
                            model: User,
                            as: 'destinatario',
                            attributes: ['id', 'username']
                        }],
                        attributes: ['id', 'text', 'read', 'createdAt']
                    }],
                    attributes: ['id', 'username']
                })
            })
            .then(user => res.status(200).send(user))
            .catch(error => res.status(400).send(error))
    }
}