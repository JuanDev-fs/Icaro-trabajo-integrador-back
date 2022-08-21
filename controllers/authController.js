//JWT
const jwt = require('jsonwebtoken')
const keys = require('../settings/keys')



module.exports ={

    //Chequeamos si existe el token
    ensureToken(req,res,next){
        const bearerHeader = req.headers['authorization']
        console.log(bearerHeader);

        if(typeof bearerHeader !== 'undefined'){
            const bearer = bearerHeader.split(" ");
            const bearerToken = bearer[1]
            req.token = bearerToken
            next()
        }else{
            res.sendStatus(403)
        }
    },

    verification(req,res,next){
        jwt.verify(req.token,keys.key,(err,data)=>{
            if(err){
                res.sendStatus(403)
            }else{
                req.data = data
                next()
            }
        })
    }

}

    