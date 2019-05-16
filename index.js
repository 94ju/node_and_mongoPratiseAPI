const Joi =require('joi');
const log=  require('./logger');
const helmet = require('helmet');
const morgan =require('morgan');
const authenticate = require('./Authenticatin');
const express=require('express');
const courses =require('./routes/courses');
const home = require('./routes/home');
const app = express();
var fs = require('fs');
var path = require('path')
const config = require('config')
app.set('view engine','pug')
app.set('views','./views')

app.use(express.json());
app.use(log);
app.use(authenticate);
app.use(helmet());
app.use('/api/courses',courses)
app.use('/',home)
//Configuration
console.log('Application name:'+ config.get('name'));
console.log('Mail server:'+ config.get('mail.host'));

if(app.get('env')==='development'){
    var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
    app.use(morgan('combined', { stream: accessLogStream }))
}
if(app.get('env')==='production'){
    var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
    app.use(morgan('', { stream: accessLogStream }))
}
app.use(express.static('public'));

app.listen(3000);