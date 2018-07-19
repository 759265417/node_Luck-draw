var express = require('express');
var router = express.Router();
var Good =require('../models/good.js');
router.get('/index',(req,res)=>{
	Good.findOne().then((goodsInfo)=>{
		if(goodsInfo){
			res.render('admin',{
				goods:goodsInfo.goods
			});	
		}
		else{
			res.render('admin',{
				goods:[]
			});
		}
		
	});
});
module.exports=router;