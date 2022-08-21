const express = require('express')
const app = express()
const PORT = 3000

const userRoutes = require('../routes/routes')
const bodyParser = require('body-parser')


const sessions = require('express-session');
const unDia = 1000*60*60*24;

app.use(sessions({
	secret: 'randomstringsessionsecret',
	saveUninitialized:true,
	cookie: { maxAge:unDia },
	resave: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use('',userRoutes)



app.listen(PORT,()=>{
    console.log(`SERVER UP ON PORT ${PORT}`)
})