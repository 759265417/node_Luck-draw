var express = require('express');
var router = express.Router();
var Map = require('../models/map.js');
var Good = require('../models/good.js');
var User = require('../models/user.js');
router.get('/index',(req,res)=>{
	var userinfo = req.cookies.userInfo111;
	if(!userinfo){
		res.render('index',{
			userInfoCookie:false
		});
	}else {
		userinfo = JSON.parse(userinfo);
		User.findOne({
			_id : userinfo._id
		}).then((userInfo)=>{
				res.render('index',{
				userInfoCookie:true,
				userInfoName:userInfo.username
			});
		});
	}
});

router.get('/register',(req,res)=>{
	res.render('register');
});

router.get('/login',(req,res)=>{
	res.render('login');
});
router.get('/play',(req,res)=>{
	isLogin(req,res);
	Map.find().then((mapInfo)=>{
		res.render('play',{  
			mapList:mapInfo
		});
	});
	
});

router.get('/info',(req,res)=>{
	isLogin(req,res);
	Good.find().then((goodsInfo)=>{
		res.render('info',{
			goodList:goodsInfo
		});
	});

})
function isLogin(req,res){
	if(!req.cookies.userInfo111){
		res.redirect('/index');
		return;
	}
}
module.exports=router;