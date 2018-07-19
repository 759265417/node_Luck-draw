var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Map = require('../models/map.js');
var Good = require('../models/good.js');
//注册功能
router.post('/register',(req,res)=>{
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
	var usernameReg = /^\w+@[a-z0-9]+(\.[a-z]+){1,3}$/;
	if(username===''){
		res.send('<script>alert("账号不能为空");history.back();</script>');
		return false;
	}else if(!usernameReg.test(username)){
		res.send('<script>alert("用户名格式不对");history.back();</script>');
		return false;
	}else if(password===''||password2===''){
		res.send('<script>alert("密码不能空");history.back();</script>');
		return false;
	}else if(password !== password2){
		res.send('<script>alert("两次密码不一样");history.back();</script>');
		return false;
	}
	User.findOne({
		username:username
	}).then((userInfo)=>{
		if(userInfo){
			res.send('<script>alert("用户名已注册过");history.back();</script>');
		}else{
			new User({
				username:username,
				pw:password
			}).save().then((userInfo)=>{
				res.send('<script>alert("注册成功,返回登录");window.location.href="/login";</script>');
			});
		}
	});
});


//登录功能
router.post('/login',(req,res)=>{
	var username = req.body.username;
	var password = req.body.password;
	if(username===''){
		res.send('<script>alert("账号不能为空");history.back();</script>');
	}else if( password===''){
		res.send('<script>alert("密码不能为空");history.back();</script>');
	}
	User.findOne({
		username:username,
		pw:password
	}).then((userInfo)=>{
		if(userInfo){
			var date = new Date();
			date.setDate(date.getDate()+5);

			res.cookie('userInfo111',JSON.stringify({
				_id:userInfo._id
			}),{expires:date});
			res.send('<script>alert("登陆成功,返回游戏首页");window.location.href="/index";</script>');
		}else{
			res.send('<script>alert("账号或者密码写错了,重新打");history.back();</script>');
		}
	});

});


//退出登录
router.get('/exit',(req,res)=>{
	res.clearCookie('userInfo111');
	res.redirect('/index');
});
//抽奖

router.get('/winning',(req,res)=>{
	var _id=req.query._id;
	Map.update({
		_id:_id
	},{$set:{isCheck:true}}).then((mapInfo)=>{
		if(mapInfo){
			Good.findOne({}).then((goodsInfo)=>{
				var goods = goodsInfo.goods;
				// console.log(goods);
				var random =Math.random();
				function showInfos(goods){
					var oldArr = [];
					for(var i=0;i<goods.length;i++){
						oldArr.push(goods[i].content);
					}
					console.log(oldArr);
				}
				showInfos(goods);
				function randomChoujiang(goods){
					var result=[];
					var count =0;
					for(var i=0;i<goods.length;i++){
						count+=(goods[i].chance)/100;
						result.push(count);
					}
					// console.log(result);
					for(var i=0;i<result.length;i++){
						if(i==0){
							if(random<=result[i]){
								return goods[i].content;
							}
						}
						else{
							if(random>result[i-1] && random<=result[i]){
								// ---------------------------------console.log(goods[i].content);
								return goods[i].content;
							}				
						}
					}

				}	
					// console.log(randomChoujiang(goods));
				
				// var randomGood = goods[ Math.floor(Math.random() * goods.length) ];
					res.send(JSON.stringify({
					code : 0,
					goods:randomChoujiang(goods)
				}));
			});
			
		}
	});
});
module.exports=router;