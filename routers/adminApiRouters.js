var express = require('express');
var router = express.Router();
var Map = require('../models/map.js');
var Good = require('../models/good.js');


//创建地图
router.get('/createMap',(req,res)=>{
	var num = req.query.number;
	Map.remove({}).then(()=>{
		for(var i=0;i<num;i++){
			new Map({
				isCheck:false
			}).save().then();
		}
		res.send(JSON.stringify({
			code: 0,
			count:num
		}));
	});	
});

//增加商品
router.get('/addGoods',(req,res)=>{
	var content = req.query.content;
	var chance = req.query.chance;
	// console.log(content);
	// console.log(chance);
	Good.findOne({}).then((goodsInfo)=>{
		if(goodsInfo){
			// goodsInfo.goods.push(content);

			// { content : '小米' , chance : '0.22' }

			Good.update({},{ $addToSet:{goods:[{'content':content,'chance':chance}]}}).then((goodsInfo)=>{
				if(goodsInfo){
					// console.log(goodsInfo);
					res.send(JSON.stringify({
						code:0,	
						content:goodsInfo.content,
						chance:goodsInfo.chance
					}));
					// console.log(content);
				}/*else{
					res.send(JSON.stringify({
						code:1,	
						content:goods.content,
						chance:goods.chance
					}));
				}*/
			});

		}else{
			new Good({
				goods:[{'content':content,'chance':chance}]
			}).save().then((goodsInfo)=>{
				res.send(JSON.stringify({
					code:0,
					content:goodsInfo.content,
					chance:goodsInfo.chance
				}));
			});
		}
	});
});


//删除商品
router.get('/deleteGoods',(req,res)=>{
	var content = req.query.content;
	var chance = req.query.chance;
	Good.findOne().then((goodsInfo)=>{
		var goodsInfo = goodsInfo.goods;
		 // console.log(goodsInfo);
		for(var i=0;i<goodsInfo.length;i++){
			if(goodsInfo[i].content===content){
				goodsInfo.splice(i,1);
			}
		}
		Good.update({},{$set:{goods: goodsInfo}}).then((goodsInfo)=>{
			if(goodsInfo){
				res.send(JSON.stringify({
					code:0
				}));
			}
		});
	});
});

module.exports = router;
