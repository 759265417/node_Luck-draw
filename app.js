var express = require('express');
var mongoose = require('mongoose');
var hostDB = 'mongodb://localhost:27017/treasureLSJ';
var app = express();
var port=3000;
var hostname='localhost';
var pageRouters =require('./routers/pageRouters.js');
var apiRouters = require('./routers/apiRouters.js');
var adminApiRouters = require('./routers/adminApiRouters.js');
var adminPageRouters = require('./routers/adminPageRouters.js');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.set('views','./views');
app.set('view engine','ejs');
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/',pageRouters);
app.use('/api',apiRouters);
app.use('/admin',adminApiRouters);
app.use('/admin',adminPageRouters);
app.use((req,res)=>{
	res.redirect('/index');
});
mongoose.connect(hostDB,(err)=>{
	if(err){
		console.log('connect to db false');
	}else{
		console.log('connect to db success');
		app.listen(port,hostname,(err)=>{
			if(err){
				console.log('connect to server false');
			}else{
				console.log('connect to server success');
			}
		});
	}
});