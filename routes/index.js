var express = require('express');
var router = express.Router();

var logo= require("../models/header");
var nodemailer = require('nodemailer');
//var md_setting= require("../models/setting");
var mdsim= require("../models/sim");
var mdsim_index= require("../models/sim_index");
var mdsim_dn= require("../models/sim_vipdn");
var mdsim_news= require("../models/sim_news");
var mdsim_vip= require("../models/sim_vip");
var mdgia= require("../models/price");
var mdcontent= require("../models/content");
const url = require('url');
var handleLayoutMDW = require('../controlers/handleLayout');

/* GET home page. */
router.get('/', function(req, res, next) {
	mdsim_dn.find().limit(20).sort( { stt_daily:1 }).then(function(sim_dn){
		mdsim_index.find().sort( { stt_daily:1 }).then(function(sim){
			res.render('index',{product: sim, sim_dn: sim_dn});
		})

	});
});
/* page cơ bản */
router.get('/default.php?com=tim-kiem&keyword=:key&p=:page', function (req, res) {
	res.render('site/pages/error');
});
router.get('/default.php?com=tim-kiem&keyword=:key', function (req, res) {
	res.render('site/pages/error');
});
router.get('/dat-hang-thanh-cong.html', function (req, res) {
	res.render('site/pages/success');
});
router.get('/sim-phong-thuy.html', function (req, res) {
	var title="Sim Phong thủy ";
	var fullurl=getCurrentPageURL(req, res);
	mdcontent.findOne({type: 'phongthuy'}).exec(function(err, data_products) {
		res.render('site/pages/baiviet',{fullurl:fullurl, content: data_products, title:title});
	});
});
router.get('/thanh-toan.html', function (req, res) {
	var title="Hướng dẫn thanh toán ";
	var fullurl=getCurrentPageURL(req, res);
	mdcontent.findOne({type: 'thanhtoan'}).exec(function(err, data_products) {
		res.render('site/pages/baiviet',{fullurl:fullurl, content: data_products, title:title});
	});
});
router.get('/lien-he.html', function (req, res) {
	var datas={};
	datas["error"]= false;
	datas["mes"]= "";
	res.render("site/pages/contact", {data:datas});
	/* var title="Hướng dẫn thanh toán ";
    var fullurl=getCurrentPageURL(req, res);
    mdcontent.findOne({type: 'thanhtoan'}).exec(function(err, data_products) {
        res.render('site/pages/baiviet',{fullurl:fullurl, content: data_products, title:title});
    }); */
});
router.post("/lien-he.html", function (req, res) {
	var nodemailer = require('nodemailer');
	var datas={};
	const option = {
		service: 'gmail',
		auth: {
			user: 'tamvinh.sangtaoads@gmail.com', // email hoặc username
			pass: '1211176762' // password
		}
	};
	var transporter = nodemailer.createTransport(option);

	transporter.verify(function(error, success) {
		// Nếu có lỗi.
		// var body1='<table style="border:1px solid #ccc;font-size:15px; background:rgba(15, 117, 188, 0.1);"><tr style="padding:0px;color:#fff;background:#0F75BC;height:35px;"><th>Thông tin liên hệ từ website :</th><td></td></tr><tr style="padding:0px;border-bottom:1px solid #ccc;"><th style="text-align:left;margin:0px;padding:0px 20px;height:35px;">Họ tên :</th><td><span style="color:red;font-weight:bold;">'+req.params.ten_lienhe+'</span></td></tr><tr style="padding:0px;border-bottom:1px solid #ccc;"><th style="text-align:left;margin:0px;padding:0px 20px;height:35px;">Địa chỉ :</th><td><span style="color:red;font-weight:bold;">'+req.params.diachi_lienhe+'</span></td></tr><tr style="padding:0px;border-bottom:1px solid #ccc;"><th style="text-align:left;margin:0px;padding:0px 20px;height:35px;">Điện thoại :</th><td><span style="color:red;font-weight:bold;">'+req.params.dienthoai_lienhe+'</span></td></tr><tr style="padding:0px;border-bottom:1px solid #ccc;"><th style="text-align:left;margin:0px;padding:0px 20px;height:35px;">Email :</th><td><span style="color:red;font-weight:bold;">'+req.params.email_lienhe+'</span></td></tr><tr style="padding:0px;border-bottom:1px solid #ccc;"><th style="text-align:left;margin:0px;padding:0px 20px;height:35px;">Chủ đề :</th><td><span style="color:red;font-weight:bold;">'+req.params.tieude_lienhe+'</span></td></tr><tr style="padding:0px;border-bottom:1px solid #ccc;"><th style="text-align:left;margin:0px;padding:0px 20px;height:35px;">Nội dung :</th><td><span style="color:red;font-weight:bold;">'+req.params.noidung_lienhe+'</span></td></tr></table>';

		if (error) {
		} else { //Nếu thành công.
			console.log('Kết nối thành công!');
			var mail = {
				from: 'donhangsimcuatui1@gmail.com', // Địa chỉ email của người gửi
				to: 'donhangsimcuatui1@gmail.com', // Địa chỉ email của người gửi
				subject: 'Thư liên hệ từ website', // Tiêu đề mail
				text: "test", // Nội dung mail dạng text
			};
			//Tiến hành gửi email
			transporter.sendMail(mail, function(error, info) {
				if (error) { // nếu có lỗi
					console.log(error);
					datas["error"]= true;
					datas["mes"]= error;
					res.render("site/pages/contact", {data:datas});
				} else { //nếu thành công
					datas["error"]= false;
					datas["mes"]= "Gửi mail thành công";
					res.render("site/pages/contact", {data:datas});
				}
			});
		}
	});
})
/* sim giá mobile page. */
router.get('/sim-gia-:gia.html', function (req, res) {
	simForPriceMb(req, res);
});
router.get('/sim-gia-:gia.html&p=:page', function (req, res) {
	simForPriceMb(req, res);
});
router.get('/sim-gia-:gia.html&filter=:filter&price=:price&sort=:sort&p=:page', function (req, res) {
	simForPriceMb(req, res);
});
router.get('/sim-gia-:gia.html&filter=:filter&price=:price&sort=:sort', function (req, res) {
	simForPriceMb(req, res);
});
function simForPriceMb(req, res){
	var gia=req.params.gia;
	var title="Sim số đẹp ";
	var query={}, sort={};
	if(req.params.gia=="duoi-500"){
		query["gia"]= {$gte: 0,$lte: 500000};
	}
	if(req.params.gia=="tu-500-den-1-trieu"){
		query["gia"]= {$gte: 500000,$lte: 1000000};
	}
	if(req.params.gia=="tu-1-den-3-trieu"){
		query["gia"]= {$gte: 1000000,$lte: 3000000};
	}
	if(req.params.gia=="tu-3-den-5-trieu"){
		query["gia"]= {$gte: 3000000,$lte: 5000000};
	}
	if(req.params.gia=="tu-5-den-20-trieu"){
		query["gia"]= {$gte: 5000000,$lte: 2000000};
	}
	if(req.params.gia=="tu-20-den-50-trieu"){
		query["gia"]= {$gte: 20000000,$lte: 50000000};
	}
	if(req.params.gia=="tren-50-trieu"){
		query["gia"]= {$gte: 50000000};
	}

	var fullurl=getCurrentPageURL(req, res);
	var fullurl_fill=getCurrentPageURLFilter(req, res);
	var perPage = 50; /* perPage - số dòng dữ liệu trên mỗi trang */
	var page = req.params.page || 1; /* page - biến chứa số trang hiện tại (Lấy từ request) */
	if(req.params.filter){
		if(req.params.filter!="all"){
			query["mang"]=req.params.filter;
		}
		if(req.params.price!=0){
			if(req.params.price=="moi"){
				query["dau2"]={$ne: "09"};
			}else if(req.params.price=="cu"){
				query["dau2"]="09";
			}
		}
	}
	if(req.params.sort){
		if(req.params.sort==0){
			sort["stt_daily"]= 1;
		}
		if(req.params.sort==1){
			sort["gia"]= 1;
			sort["stt_daily"]= 1;
		}
		if(req.params.sort==2){
			sort["gia"]= -1;
			sort["stt_daily"]= 1;
		}
	}else{
		sort["stt_daily"]=1;
	}
	mdsim.find(query, {sim1:1, sim2: 1, gia: 1, mang: 1}).sort( sort )
		.skip((perPage * page) - perPage) /* mỗi trang chúng ta cần phải bỏ qua ((perPage * page) - perPage) giá trị (trên trang đầu tiên giá trị của bỏ qua phải là 0): */
		.limit(perPage)
		.exec(function(err, data_products) {
			mdsim.find(query,{_id:1}).limit(20000).count().exec(function(err, count) { /* dùng count để tính số trang */
				if (err) throw err;
				//var data_products_json = JSON.stringify(data_products); /* chuyển sang chuỗi JSON hợp lệ */
				res.render('site/pages/sim_price', {
					fullurl: fullurl,
					fullurl_fill: fullurl_fill,
					filter: req.params.filter,
					price: req.params.price,
					sort: req.params.sort,
					product: data_products,
					title: title,
					current: page,
					pages: Math.ceil(count / perPage)
				});
			});
		});
}
/* GET mạng page. */
router.get('/so-dep-:mang.html', function (req, res) {
	simForMang(req, res);
});
router.get('/so-dep-:mang.html&p=:page', function (req, res) {
	simForMang(req, res);
});
router.get('/so-dep-:mang.html&filter=:filter&price=:price&sort=:sort&p=:page', function (req, res) {
	simForMang(req, res);
});
router.get('/so-dep-:mang.html&filter=:filter&price=:price&sort=:sort', function (req, res) {
	simForMang(req, res);
});

function simForMang(req, res){
	var title="Sim số đẹp "+req.params.mang;
	var fullurl=getCurrentPageURL(req, res);
	var fullurl_fill=getCurrentPageURLFilter(req, res);
	var perPage = 50; /* perPage - số dòng dữ liệu trên mỗi trang */
	var page = req.params.page || 1; /* page - biến chứa số trang hiện tại (Lấy từ request) */
	var query={};var sort={};
	query["mang"]=req.params.mang;
	if(req.params.filter){
		if(req.params.filter!="all"){
			if(req.params.filter=="moi"){
				if(req.params.mang=="mobifone"){
					query={ $or: [ { dau2: "07" }, { dau2: "08" } ] };
				}
				if(req.params.mang=="viettel"){
					query["dau2"]="03";
				}
				if(req.params.mang=="vinaphone"){
					query["dau2"]="08";
				}
				if(req.params.mang=="vietnammobile"){
					query["dau2"]="05";
				}
			}else if(req.params.filter=="cu"){
				query["dau2"]="09";
			}
		}
		if(req.params.price!=0){
			if(req.params.price==1){
				query["gia"]= {$gte: 0,$lte: 1000000};
			}
			if(req.params.price==2){
				query["gia"]= {$gte: 1000000,$lte: 3000000};
			}
			if(req.params.price==3){
				query["gia"]= {$gte: 3000000,$lte: 5000000};
			}
			if(req.params.price==4){
				query["gia"]= {$gte: 5000000,$lte: 1000000};
			}
			if(req.params.price==5){
				query["gia"]= {$gte: 10000000,$lte: 20000000};
			}
			if(req.params.price==6){
				query["gia"]= {$gte: 20000000,$lte: 50000000};
			}
			if(req.params.price==7){
				query["gia"]= {$gte: 50000000};
			}

		}
	}
	if(req.params.sort){
		if(req.params.sort==0){
			sort["stt_daily"]= 1;
		}
		if(req.params.sort==1){
			sort["gia"]= 1;
			sort["stt_daily"]= 1;
		}
		if(req.params.sort==2){
			sort["gia"]= -1;
			sort["stt_daily"]= 1;
		}
	}else{
		sort["stt_daily"]=1;
	}
	mdsim.find(query).limit(20000).count().exec(function(err, count) {
		mdsim.find(query,{sim1:1, sim2:1, gia:1, mang: 1}).sort(sort)
			.skip((perPage * page) - perPage) /* mỗi trang chúng ta cần phải bỏ qua ((perPage * page) - perPage) giá trị (trên trang đầu tiên giá trị của bỏ qua phải là 0): */
			.limit(perPage)
			.exec(function (err, data_products) {
				if (err) throw err;
				res.render('site/pages/sim1', {
					fullurl: fullurl,
					fullurl_fill: fullurl_fill,
					filter: req.params.filter,
					price: req.params.price,
					sort: req.params.sort,
					product: data_products,
					title: title,
					current: page,
					pages: Math.ceil(count / perPage)
				});
			});
	});
}
//Search page
router.get('/search-:key.html', function (req, res) {
	searchSimPage(req, res);
});
router.get('/search-:key.html&p=:page', function (req, res) {
	searchSimPage(req, res);
});
router.get('/search-:key.html&filter=:filter&price=:price&sort=:sort&p=:page', function (req, res) {
	searchSimPage(req, res);
});
router.get('/search-:key.html&filter=:filter&price=:price&sort=:sort', function (req, res) {
	searchSimPage(req, res);
});

function searchSimPage(req, res){
	var title="Tìm kiếm sim "+req.params.key;
	var key=req.params.key;
	var arr_key=key.split("*");
	var fullurl=getCurrentPageURL(req, res);
	var fullurl_fill=getCurrentPageURLFilter(req, res);
	var perPage = 50; /* perPage - số dòng dữ liệu trên mỗi trang */
	var page = req.params.page || 1; /* page - biến chứa số trang hiện tại (Lấy từ request) */

	var query={}, sort={};
	var query_fil={};
	if(arr_key.length>1){
		var slen1=arr_key[0].length;
		var slen2=arr_key[1].length;
		var fil=arr_key[1].substr(-6);

		if(slen1>1){
			if(slen2>1){
				query["dau"+arr_key[0].length]= arr_key[0];
				query["duoi"+arr_key[1].length]= arr_key[1];
				query_fil["duoi"+fil.length]= fil;
			}else{
				query["dau"+arr_key[0].length]= arr_key[0];
			}

			//query={$and : [{ "sim2": {$regex: "^"+arr_key[0]+"+"} },{ "sim2": {$regex: ".+"+arr_key[1]+"$"} }]};
		}else{
			query["duoi"+arr_key[1].length]= arr_key[1];
			query_fil["duoi"+fil.length]= fil;
			//query={"sim2": {$regex: ".+"+arr_key[1]+"$"} };
		}
	}else{
		var slen=key.length;
		var fil=key.substr(-6);
		if(slen>9){
			query["sim2"]= key;
			query_fil["duoi"+fil.length]= fil;
		}else{
			query["duoi"+key.length]= key;
			query_fil["duoi"+fil.length]= fil;
			//query={"sim2": {$regex: ".+"+key+"$"} }; // search có chuỗi là key
			//query={"sim2": {$regex: key} }; // search có chuỗi là key
		}
	}
	if(req.params.filter){
		if(req.params.filter!="all"){
			query["mang"]=req.params.filter;
			query_fil["mang"]=req.params.filter;
		}
		if(req.params.price!=0){
			if(req.params.price==1){
				query["gia"]= {$gte: 0,$lte: 1000000};
				query_fil["gia"]= {$gte: 0,$lte: 1000000};
			}
			if(req.params.price==2){
				query["gia"]= {$gte: 1000000,$lte: 3000000};
				query_fil["gia"]= {$gte: 1000000,$lte: 3000000};
			}
			if(req.params.price==3){
				query["gia"]= {$gte: 3000000,$lte: 5000000};
				query_fil["gia"]= {$gte: 3000000,$lte: 5000000};
			}
			if(req.params.price==4){
				query["gia"]= {$gte: 5000000,$lte: 1000000};
				query_fil["gia"]= {$gte: 5000000,$lte: 1000000};
			}
			if(req.params.price==5){
				query["gia"]= {$gte: 10000000,$lte: 20000000};
				query_fil["gia"]= {$gte: 10000000,$lte: 20000000};
			}
			if(req.params.price==6){
				query["gia"]= {$gte: 20000000,$lte: 50000000};
				query_fil["gia"]= {$gte: 20000000,$lte: 50000000};
			}
			if(req.params.price==7){
				query["gia"]= {$gte: 50000000};
				query_fil["gia"]= {$gte: 50000000};
			}

		}
	}
	if(req.params.sort){
		if(req.params.sort==0){
			sort["stt_daily"]= 1;
		}
		if(req.params.sort==1){
			sort["gia"]= 1;
			sort["stt_daily"]= 1;
		}
		if(req.params.sort==2){
			sort["gia"]= -1;
			sort["stt_daily"]= 1;
		}
	}else{
		sort["stt_daily"]=1;
	}
	mdsim.find(query, {sim1: 1, sim2: 1, gia: 1, mang: 1}).sort( sort ).skip((perPage * page) - perPage).limit(perPage).exec(function(err, data_products) {
		if(data_products.length==0){
			title="Sim "+req.params.key;
			mdsim.find(query_fil).sort( sort).limit(20).exec(function(err, data_products) {
				res.render('site/pages/sim_khac',{fullurl:fullurl,sim: req.params.key, product: data_products, title:title});
			})
		}else{
			mdsim.find(query).limit(20000).count().exec(function(err, count) {
				if (err) throw err;
				res.render('site/pages/sim', {
					fullurl: fullurl,
					fullurl_fill: fullurl_fill,
					filter: req.params.filter,
					price: req.params.price,
					sort: req.params.sort,
					product: data_products,
					title: title,
					current: page,
					pages: Math.ceil(count / perPage)
				});
			})
		}
	});
}
/* GET chi tiết page. */
router.get("/mua-sim-dep-:sim.html", function (req, res) {
	var sim=req.params.sim;
	var sim_fil=sim.substr(-5);
	var query={};
	query["duoi"+sim_fil.length]= sim_fil;
	mdsim.findOne({sim2: sim}).exec(function(err, data) {
		mdsim.find(query).sort( { stt_daily:1 } ).limit(30).exec(function(err, data_products) {
			if(data){
				res.render('site/pages/sim_detail', {
					product: data_products,
					sim_detail: data
				});
			}else{
				res.render('site/pages/error');
			}
		});
	});
})
router.post("/mua-sim-dep-:sim.html", function (req, res) {
	var md_donhang= require("../models/donhang");
	var sim=req.params.sim;
	var asiaTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"});
	var now = new Date(asiaTime);

	mdsim.findOne({sim2: sim}).exec(function(err, data) {
		var save_dh = new md_donhang({
			madonhang: makeid(6),
			hoten: req.body.dh_hoten,
			dienthoai: req.body.dh_dienthoai,
			email: req.body.dh_email,
			diachi: req.body.dh_diachi,
			noidung: req.body.dh_noidung,
			ghichu: "",
			tonggia: data.gia,
			tinhtrang: "5bc77a5e0be2541544ae74ce",
			ngaycapnhat: "",
			sim: data.sim1,
			sim1: data.sim2,
			daily: data.tendaily,
			filesim: data.file,
			user_order: "Đặt online",
			user_xuly: "",
			ngaytao: now.toLocaleString(),
			soluong:1,
			hienthi:1,
		});
		save_dh.save(function(error){
			if(error){
				throw error;
			}
			res.redirect("dat-hang-thanh-cong.html");
			//res.render('site/pages/success');
		});
	});
})
//Sim đặc biệt
router.get('/sim-so-dep-:kieu.html', function (req, res) {
	simForKieu(req,res);
});
router.get('/sim-so-dep-:kieu.html&p=:page', function (req, res) {
	simForKieu(req,res);
});
router.get('/sim-so-dep-:kieu.html&filter=:filter&price=:price&sort=:sort&p=:page', function (req, res) {
	simForKieu(req,res);
});
router.get('/sim-so-dep-:kieu.html&filter=:filter&price=:price&sort=:sort', function (req, res) {
	simForKieu(req,res);
});

function simForKieu(req,res){
	var title="Sim số đẹp "+titleSimkieu(req.params.kieu);
	var kieu=req.params.kieu;
	var fullurl=getCurrentPageURL(req, res);
	var fullurl_fill=getCurrentPageURLFilter(req, res);
	var perPage = 50; /* perPage - số dòng dữ liệu trên mỗi trang */
	var page = req.params.page || 1; /* page - biến chứa số trang hiện tại (Lấy từ request) */
	var query={};var sort={};
	query[kieu]={$gte: 1};
	if(req.params.filter){
		if(req.params.filter!="all"){
			query["mang"]=req.params.filter;
		}
		if(req.params.price!=0){
			if(req.params.price==1){
				query["gia"]= {$gte: 0,$lte: 1000000};
			}
			if(req.params.price==2){
				query["gia"]= {$gte: 1000000,$lte: 3000000};
			}
			if(req.params.price==3){
				query["gia"]= {$gte: 3000000,$lte: 5000000};
			}
			if(req.params.price==4){
				query["gia"]= {$gte: 5000000,$lte: 1000000};
			}
			if(req.params.price==5){
				query["gia"]= {$gte: 10000000,$lte: 20000000};
			}
			if(req.params.price==6){
				query["gia"]= {$gte: 20000000,$lte: 50000000};
			}
			if(req.params.price==7){
				query["gia"]= {$gte: 50000000};
			}

		}
	}
	if(req.params.sort){
		if(req.params.sort==0){
			sort["stt_daily"]= 1;
		}
		if(req.params.sort==1){
			sort["gia"]= 1;
			sort["stt_daily"]= 1;
		}
		if(req.params.sort==2){
			sort["gia"]= -1;
			sort["stt_daily"]= 1;
		}
	}else{
		sort["stt_daily"]=1;
	}
	mdsim.find(query, {sim1: 1, sim2: 1, gia: 1, mang: 1}).sort( sort )
		.skip((perPage * page) - perPage) /* mỗi trang chúng ta cần phải bỏ qua ((perPage * page) - perPage) giá trị (trên trang đầu tiên giá trị của bỏ qua phải là 0): */
		.limit(perPage)
		.exec(function(err, data_products) {
			mdsim.find(query,{_id:1}).limit(20000).count().exec(function(err, count) { /* dùng count để tính số trang */
				if (err) throw err;
				//var data_products_json = JSON.stringify(data_products); /* chuyển sang chuỗi JSON hợp lệ */
				res.render('site/pages/sim', {
					fullurl: fullurl,
					fullurl_fill: fullurl_fill,
					filter: req.params.filter,
					price: req.params.price,
					sort: req.params.sort,
					product: data_products,
					title: title,
					current: page,
					pages: Math.ceil(count / perPage)
				});
			});
		});
}
//Sim đặc biệt theo mạng
router.get('/:kieu/:mang.html', function (req, res) {
	simForKieuMang(req, res);
});
router.get('/:kieu/:mang.html&p=:page', function (req, res) {
	simForKieuMang(req, res);
});
router.get('/:kieu/:mang.html&filter=:filter&price=:price&sort=:sort&p=:page', function (req, res) {
	simForKieuMang(req, res);
});
router.get('/:kieu/:mang.html&filter=:filter&price=:price&sort=:sort', function (req, res) {
	simForKieuMang(req, res);
});

function simForKieuMang(req, res){
	var title="Sim số đẹp "+titleSimkieu(req.params.kieu)+ "mạng " + req.params.mang;
	var kieu=req.params.kieu;
	var query={}, sort={};
	query[kieu]={$gte: 1};
	query["mang"]=req.params.mang;
	var fullurl=getCurrentPageURL(req, res);
	var fullurl_fill=getCurrentPageURLFilter(req, res);
	var perPage = 50; /* perPage - số dòng dữ liệu trên mỗi trang */
	var page = req.params.page || 1; /* page - biến chứa số trang hiện tại (Lấy từ request) */
	if(req.params.filter){
		if(req.params.filter!="all"){
			if(req.params.filter=="moi"){
				if(req.params.mang=="mobifone"){
					query={ $or: [ { dau2: "07" }, { dau2: "08" } ] };
				}
				if(req.params.mang=="viettel"){
					query["dau2"]="03";
				}
				if(req.params.mang=="vinaphone"){
					query["dau2"]="08";
				}
				if(req.params.mang=="vietnammobile"){
					query["dau2"]="05";
				}
			}else if(req.params.filter=="cu"){
				query["dau2"]="09";
			}
		}
		if(req.params.price!=0){
			if(req.params.price==1){
				query["gia"]= {$gte: 0,$lte: 1000000};
			}
			if(req.params.price==2){
				query["gia"]= {$gte: 1000000,$lte: 3000000};
			}
			if(req.params.price==3){
				query["gia"]= {$gte: 3000000,$lte: 5000000};
			}
			if(req.params.price==4){
				query["gia"]= {$gte: 5000000,$lte: 1000000};
			}
			if(req.params.price==5){
				query["gia"]= {$gte: 10000000,$lte: 20000000};
			}
			if(req.params.price==6){
				query["gia"]= {$gte: 20000000,$lte: 50000000};
			}
			if(req.params.price==7){
				query["gia"]= {$gte: 50000000};
			}

		}
	}
	if(req.params.sort){
		if(req.params.sort==0){
			sort["stt_daily"]= 1;
		}
		if(req.params.sort==1){
			sort["gia"]= 1;
			sort["stt_daily"]= 1;
		}
		if(req.params.sort==2){
			sort["gia"]= -1;
			sort["stt_daily"]= 1;
		}
	}else{
		sort["stt_daily"]=1;
	}
	mdsim.find(query, {sim1: 1, sim2: 1, gia: 1, mang: 1}).sort( sort )
		.skip((perPage * page) - perPage) /* mỗi trang chúng ta cần phải bỏ qua ((perPage * page) - perPage) giá trị (trên trang đầu tiên giá trị của bỏ qua phải là 0): */
		.limit(perPage)
		.exec(function(err, data_products) {
			mdsim.find(query,{_id:1}).limit(20000).count().exec(function(err, count) { /* dùng count để tính số trang */
				if (err) throw err;
				//var data_products_json = JSON.stringify(data_products); /* chuyển sang chuỗi JSON hợp lệ */
				res.render('site/pages/sim1', {
					fullurl: fullurl,
					fullurl_fill: fullurl_fill,
					filter: req.params.filter,
					price: req.params.price,
					sort: req.params.sort,
					product: data_products,
					title: title,
					current: page,
					pages: Math.ceil(count / perPage)
				});
			});
		});
}
/* GET sim theo giá page. */
router.get('/sim-dep-gia-:gia.html', function (req, res) {
	simForPrice(req, res);
});
router.get('/sim-dep-gia-:gia.html&p=:page', function (req, res) {
	simForPrice(req, res);
});
router.get('/sim-dep-gia-:gia.html&filter=:filter&price=:price&sort=:sort&p=:page', function (req, res) {
	simForPrice(req, res);
});
router.get('/sim-dep-gia-:gia.html&filter=:filter&price=:price&sort=:sort', function (req, res) {
	simForPrice(req, res);
});

function simForPrice(req, res){
	var gia=req.params.gia;
	mdgia.find({url: req.params.gia}).exec(function(err, value) {
		var title="Sim số đẹp giá "+ value[0].ten;
		var query={}, sort={};
		if(value[0].pricefrom==0){
			query["gia"]= {$gte: parseInt(value[0].priceto)};
		}else{
			query["gia"]= {$gte: parseInt(value[0].priceto),$lte: parseInt(value[0].pricefrom)};
		}


		var fullurl=getCurrentPageURL(req, res);
		var fullurl_fill=getCurrentPageURLFilter(req, res);
		var perPage = 50; /* perPage - số dòng dữ liệu trên mỗi trang */
		var page = req.params.page || 1; /* page - biến chứa số trang hiện tại (Lấy từ request) */
		if(req.params.filter){
			if(req.params.filter!="all"){
				query["mang"]=req.params.filter;
			}
			if(req.params.price!=0){
				if(req.params.price=="moi"){
					query["dau2"]={$ne: "09"};
				}else if(req.params.price=="cu"){
					query["dau2"]="09";
				}
			}
		}
		if(req.params.sort){
			if(req.params.sort==0){
				sort["stt_daily"]= 1;
			}
			if(req.params.sort==1){
				sort["gia"]= 1;
				sort["stt_daily"]= 1;
			}
			if(req.params.sort==2){
				sort["gia"]= -1;
				sort["stt_daily"]= 1;
			}
		}else{
			sort["stt_daily"]=1;
		}
		mdsim.find(query, {sim1:1, sim2: 1, gia: 1, mang: 1}).sort( sort )
			.skip((perPage * page) - perPage) /* mỗi trang chúng ta cần phải bỏ qua ((perPage * page) - perPage) giá trị (trên trang đầu tiên giá trị của bỏ qua phải là 0): */
			.limit(perPage)
			.exec(function(err, data_products) {
				mdsim.find(query,{_id:1}).limit(20000).count().exec(function(err, count) { /* dùng count để tính số trang */
					if (err) throw err;
					//var data_products_json = JSON.stringify(data_products); /* chuyển sang chuỗi JSON hợp lệ */
					res.render('site/pages/sim_price', {
						fullurl: fullurl,
						fullurl_fill: fullurl_fill,
						filter: req.params.filter,
						price: req.params.price,
						sort: req.params.sort,
						product: data_products,
						title: title,
						current: page,
						pages: Math.ceil(count / perPage)
					});
				});
			});
	})
}
/* GET loại v90, c90 page. */
router.get('/sim-:loai-so-dep.html', function (req, res) {
	simForLoai(req, res);
});
router.get('/sim-:loai-so-dep.html&p=:page', function (req, res) {
	simForLoai(req, res);
});
router.get('/sim-:loai-so-dep.html&filter=:filter&price=:price&sort=:sort&p=:page', function (req, res) {
	simForLoai(req, res);
});
router.get('/sim-:loai-so-dep.html&filter=:filter&price=:price&sort=:sort', function (req, res) {
	simForLoai(req, res);
});

function simForLoai(req, res){
	var loai=req.params.loai;
	var query={}, sort={};
	if(loai=="v90"){
		query["v90"]=1;
	}else if(loai=="c90"){
		query["v90"]=2;
	}else if(loai=="vd90"){
		query["v90"]=3;
	}
	var title="Sim số đẹp "+ loai;
	var fullurl=getCurrentPageURL(req, res);
	var fullurl_fill=getCurrentPageURLFilter(req, res);
	var perPage = 50; /* perPage - số dòng dữ liệu trên mỗi trang */
	var page = req.params.page || 1; /* page - biến chứa số trang hiện tại (Lấy từ request) */
	if(req.params.filter){
		if(req.params.filter!="all"){
			query["mang"]=req.params.filter;
		}
		if(req.params.price!=0){
			if(req.params.price==1){
				query["gia"]= {$gte: 0,$lte: 1000000};
			}
			if(req.params.price==2){
				query["gia"]= {$gte: 1000000,$lte: 3000000};
			}
			if(req.params.price==3){
				query["gia"]= {$gte: 3000000,$lte: 5000000};
			}
			if(req.params.price==4){
				query["gia"]= {$gte: 5000000,$lte: 1000000};
			}
			if(req.params.price==5){
				query["gia"]= {$gte: 10000000,$lte: 20000000};
			}
			if(req.params.price==6){
				query["gia"]= {$gte: 20000000,$lte: 50000000};
			}
			if(req.params.price==7){
				query["gia"]= {$gte: 50000000};
			}
		}
	}
	if(req.params.sort){
		if(req.params.sort==0){
			sort["stt_daily"]= 1;
		}
		if(req.params.sort==1){
			sort["gia"]= 1;
			sort["stt_daily"]= 1;
		}
		if(req.params.sort==2){
			sort["gia"]= -1;
			sort["stt_daily"]= 1;
		}
	}else{
		sort["stt_daily"]=1;
	}
	mdsim_news.find(query, {sim1:1, sim2: 1, gia: 1, mang: 1}).sort( sort )
		.skip((perPage * page) - perPage) /* mỗi trang chúng ta cần phải bỏ qua ((perPage * page) - perPage) giá trị (trên trang đầu tiên giá trị của bỏ qua phải là 0): */
		.limit(perPage)
		.exec(function(err, data_products) {
			mdsim_news.find(query,{_id:1}).count().limit(20000).exec(function(err, count) { /* dùng count để tính số trang */
				if (err) throw err;
				//var data_products_json = JSON.stringify(data_products); /* chuyển sang chuỗi JSON hợp lệ */
				res.render('site/pages/sim', {
					fullurl: fullurl,
					fullurl_fill: fullurl_fill,
					filter: req.params.filter,
					price: req.params.price,
					sort: req.params.sort,
					product: data_products,
					title: title,
					current: page,
					pages: Math.ceil(count / perPage)
				});
			});
		});
}
/* GET trả sau page. */
router.get('/sim-tra-sau-:mang.html', function (req, res) {
	simTraSau(req, res);
});
router.get('/sim-tra-sau-:mang.html&p=:page', function (req, res) {
	simTraSau(req, res);
});
router.get('/sim-tra-sau-:mang.html&filter=:filter&price=:price&sort=:sort&p=:page', function (req, res) {
	simTraSau(req, res);
});
router.get('/sim-tra-sau-:mang.html&filter=:filter&price=:price&sort=:sort', function (req, res) {
	simTraSau(req, res);
});

function simTraSau(req, res){
	var loai=req.params.mang;
	var query={}, sort={};
	var title="Sim trả sau "+ loai;
	if(loai=="vinafone"){
		query["v90"]=4;
	}else if(loai=="viettel"){
		query["v90"]=5;
	}else{
		query["v90"]=6;
	}
	var fullurl=getCurrentPageURL(req, res);
	var fullurl_fill=getCurrentPageURLFilter(req, res);
	var perPage = 50; /* perPage - số dòng dữ liệu trên mỗi trang */
	var page = req.params.page || 1; /* page - biến chứa số trang hiện tại (Lấy từ request) */
	if(req.params.filter){
		if(req.params.filter!="all"){
			if(req.params.filter=="moi"){
				if(req.params.mang=="mobifone"){
					query={ $or: [ { dau2: "07" }, { dau2: "08" } ] };
				}
				if(req.params.mang=="viettel"){
					query["dau2"]="03";
				}
				if(req.params.mang=="vinaphone"){
					query["dau2"]="08";
				}
				if(req.params.mang=="vietnammobile"){
					query["dau2"]="05";
				}
			}else if(req.params.filter=="cu"){
				query["dau2"]="09";
			}
		}
		if(req.params.price!=0){
			if(req.params.price==1){
				query["gia"]= {$gte: 0,$lte: 1000000};
			}
			if(req.params.price==2){
				query["gia"]= {$gte: 1000000,$lte: 3000000};
			}
			if(req.params.price==3){
				query["gia"]= {$gte: 3000000,$lte: 5000000};
			}
			if(req.params.price==4){
				query["gia"]= {$gte: 5000000,$lte: 1000000};
			}
			if(req.params.price==5){
				query["gia"]= {$gte: 10000000,$lte: 20000000};
			}
			if(req.params.price==6){
				query["gia"]= {$gte: 20000000,$lte: 50000000};
			}
			if(req.params.price==7){
				query["gia"]= {$gte: 50000000};
			}
		}
	}
	if(req.params.sort){
		if(req.params.sort==0){
			sort["stt_daily"]= 1;
		}
		if(req.params.sort==1){
			sort["gia"]= 1;
			sort["stt_daily"]= 1;
		}
		if(req.params.sort==2){
			sort["gia"]= -1;
			sort["stt_daily"]= 1;
		}
	}else{
		sort["stt_daily"]=1;
	}
	mdsim_news.find(query, {sim1:1, sim2: 1, gia: 1, mang: 1}).sort( sort )
		.skip((perPage * page) - perPage) /* mỗi trang chúng ta cần phải bỏ qua ((perPage * page) - perPage) giá trị (trên trang đầu tiên giá trị của bỏ qua phải là 0): */
		.limit(perPage)
		.exec(function(err, data_products) {
			mdsim_news.find(query,{_id:1}).count().limit(20000).exec(function(err, count) { /* dùng count để tính số trang */
				if (err) throw err;
				//var data_products_json = JSON.stringify(data_products); /* chuyển sang chuỗi JSON hợp lệ */
				res.render('site/pages/sim1', {
					fullurl: fullurl,
					fullurl_fill: fullurl_fill,
					filter: req.params.filter,
					price: req.params.price,
					sort: req.params.sort,
					product: data_products,
					title: title,
					current: page,
					pages: Math.ceil(count / perPage)
				});
			});
		});
}
/* Sim vip doanh nhân */
router.get('/sim-vip-doanh-nhan.html', function (req, res) {
	simVipDN(req, res);
});
router.get('/sim-vip-doanh-nhan.html&p=:page', function (req, res) {
	simVipDN(req, res);
});
router.get('/sim-vip-doanh-nhan.html&filter=:filter&price=:price&sort=:sort&p=:page', function (req, res) {
	simVipDN(req, res);
});
router.get('/sim-vip-doanh-nhan.html&filter=:filter&price=:price&sort=:sort', function (req, res) {
	simVipDN(req, res);
});

function simVipDN(req, res){
	var loai=req.params.loai;
	var query={}, sort={};
	var title="Sim VIP doanh nhân";
	var fullurl=getCurrentPageURL(req, res);
	var fullurl_fill=getCurrentPageURLFilter(req, res);
	var perPage = 50; /* perPage - số dòng dữ liệu trên mỗi trang */
	var page = req.params.page || 1; /* page - biến chứa số trang hiện tại (Lấy từ request) */
	if(req.params.filter){
		if(req.params.filter!="all"){
			query["mang"]=req.params.filter;
		}
		if(req.params.price!=0){
			if(req.params.price==1){
				query["gia"]= {$gte: 0,$lte: 1000000};
			}
			if(req.params.price==2){
				query["gia"]= {$gte: 1000000,$lte: 3000000};
			}
			if(req.params.price==3){
				query["gia"]= {$gte: 3000000,$lte: 5000000};
			}
			if(req.params.price==4){
				query["gia"]= {$gte: 5000000,$lte: 1000000};
			}
			if(req.params.price==5){
				query["gia"]= {$gte: 10000000,$lte: 20000000};
			}
			if(req.params.price==6){
				query["gia"]= {$gte: 20000000,$lte: 50000000};
			}
			if(req.params.price==7){
				query["gia"]= {$gte: 50000000};
			}
		}
	}
	if(req.params.sort){
		if(req.params.sort==0){
			sort["stt_daily"]= 1;
		}
		if(req.params.sort==1){
			sort["gia"]= 1;
			sort["stt_daily"]= 1;
		}
		if(req.params.sort==2){
			sort["gia"]= -1;
			sort["stt_daily"]= 1;
		}
	}else{
		sort["stt_daily"]=1;
	}
	mdsim_dn.find(query, {sim1:1, sim2: 1, gia: 1, mang: 1}).sort( sort )
		.skip((perPage * page) - perPage) /* mỗi trang chúng ta cần phải bỏ qua ((perPage * page) - perPage) giá trị (trên trang đầu tiên giá trị của bỏ qua phải là 0): */
		.limit(perPage)
		.exec(function(err, data_products) {
			mdsim_dn.find(query,{_id:1}).count().limit(20000).exec(function(err, count) { /* dùng count để tính số trang */
				if (err) throw err;
				//var data_products_json = JSON.stringify(data_products); /* chuyển sang chuỗi JSON hợp lệ */
				res.render('site/pages/sim', {
					fullurl: fullurl,
					fullurl_fill: fullurl_fill,
					filter: req.params.filter,
					price: req.params.price,
					sort: req.params.sort,
					product: data_products,
					title: title,
					current: page,
					pages: Math.ceil(count / perPage)
				});
			});
		});
}
/* page Sim giá rẻ */
router.get('/sim-khuyen-mai.html', function (req, res) {
	simKM(req, res);
});
router.get('/sim-khuyen-mai.html&p=:page', function (req, res) {
	simKM(req, res);
});
router.get('/sim-khuyen-mai.html&filter=:filter&price=:price&sort=:sort&p=:page', function (req, res) {
	simKM(req, res);
});
router.get('/sim-khuyen-mai.html&filter=:filter&price=:price&sort=:sort', function (req, res) {
	simKM(req, res);
});

function simKM(req, res){
	var loai=req.params.loai;
	var query={}, sort={};
	var title="Sim VIP rẻ";
	var fullurl=getCurrentPageURL(req, res);
	var fullurl_fill=getCurrentPageURLFilter(req, res);
	var perPage = 50; /* perPage - số dòng dữ liệu trên mỗi trang */
	var page = req.params.page || 1; /* page - biến chứa số trang hiện tại (Lấy từ request) */
	if(req.params.filter){
		if(req.params.filter!="all"){
			query["mang"]=req.params.filter;
		}
		if(req.params.price!=0){
			if(req.params.price==1){
				query["gia"]= {$gte: 0,$lte: 1000000};
			}
			if(req.params.price==2){
				query["gia"]= {$gte: 1000000,$lte: 3000000};
			}
			if(req.params.price==3){
				query["gia"]= {$gte: 3000000,$lte: 5000000};
			}
			if(req.params.price==4){
				query["gia"]= {$gte: 5000000,$lte: 1000000};
			}
			if(req.params.price==5){
				query["gia"]= {$gte: 10000000,$lte: 20000000};
			}
			if(req.params.price==6){
				query["gia"]= {$gte: 20000000,$lte: 50000000};
			}
			if(req.params.price==7){
				query["gia"]= {$gte: 50000000};
			}
		}
	}
	if(req.params.sort){
		if(req.params.sort==0){
			sort["stt_daily"]= 1;
		}
		if(req.params.sort==1){
			sort["gia"]= 1;
			sort["stt_daily"]= 1;
		}
		if(req.params.sort==2){
			sort["gia"]= -1;
			sort["stt_daily"]= 1;
		}
	}else{
		sort["stt_daily"]=1;
	}
	mdsim_vip.find(query, {sim1:1, sim2: 1, gia: 1, mang: 1}).sort( sort )
		.skip((perPage * page) - perPage) /* mỗi trang chúng ta cần phải bỏ qua ((perPage * page) - perPage) giá trị (trên trang đầu tiên giá trị của bỏ qua phải là 0): */
		.limit(perPage)
		.exec(function(err, data_products) {
			mdsim_vip.find(query,{_id:1}).count().limit(20000).exec(function(err, count) { /* dùng count để tính số trang */
				if (err) throw err;
				//var data_products_json = JSON.stringify(data_products); /* chuyển sang chuỗi JSON hợp lệ */
				res.render('site/pages/sim', {
					fullurl: fullurl,
					fullurl_fill: fullurl_fill,
					filter: req.params.filter,
					price: req.params.price,
					sort: req.params.sort,
					product: data_products,
					title: title,
					current: page,
					pages: Math.ceil(count / perPage)
				});
			});
		});
}
function numberFormat(num, ext) {
	ext = (!ext) ? ' ' : ext;
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ext;
}
function titleSimkieu(kieu){
	var kq='';
	switch (kieu){
		case "sim-luc-quy":
			kq="Sim lục quý";
			break;
		case "sim-ngu-quy":
			kq="Sim Ngũ quý";
			break;
		case "sim-tu-quy":
			kq="Sim tứ quý";
			break;
		case "sim-tam-hoa":
			kq="Sim tam hoa";
			break;
		case "sim-tam-hoa-kep":
			kq="Sim tam hoa kép";
			break;
		case "sim-sanh-tien":
			kq="Sim sảnh tiến";
			break;
		case "sim-lap":
			kq="Sim lặp";
			break;
		case "sim-taxi":
			kq="Sim taxi";
			break;
		case "sim-tu-quy-gia":
			kq="Sim tứ quý giữa";
			break;
		case "sim-kep":
			kq="Sim kép";
			break;
		case "sim-ngu-quy-giua":
			kq="Sim ngũ quý giữa";
			break;
		case "sim-loc-phat":
			kq="Sim lộc phát";
			break;
		case "sinh-tai-loc-phat":
			kq="Sinh tài lộc phát";
			break;
		case "sim-than-tai":
			kq="Sim thần tài";
			break;
		case "sim-ong-dia":
			kq="Sim sim ông địa";
			break;
		case "sim-ganh-dao":
			kq="Sim gánh đảo";
			break;
		case "sim-soi-guong":
			kq="Sim soi gương";
			break;
		case "sim-nam-sinh":
			kq="Sim năm sinh";
			break;
		case "sim-ganh":
			kq="Sim gánh";
			break;
		case "sim-san-bang-tat-ca":
			kq="Sim san bằng tất cả";
			break;
		case "bon-mua-khong-that":
			kq="Sim bốn mùa không thất";
			break;
		case "sim-doc-nhat-vo-nhi":
			kq="Sim độc nhất vô nhị";
			break;
	}
	return kq;
}
function valueSimkieu(kieu){
	var kq='';
	switch (kieu){
		case "sim-luc-quy":
			kq=24;
			break;
		case "sim-ngu-quy":
			kq=25;
			break;
		case "sim-tu-quy":
			kq=26;
			break;
		case "sim-tam-hoa":
			kq=27;
			break;
		case "sim-tam-hoa-kep":
			kq=28;
			break;
		case "sim-sanh-tien":
			kq=29;
			break;
		case "sim-lap":
			kq=30;
			break;
		case "sim-taxi":
			kq=31;
			break;
		case "sim-kep":
			kq=32;
			break;
		case "sim-ngu-quy-giua":
			kq=10;
			break;
		case "sim-tu-quy-giua":
			kq=11;
			break;
		case "sim-loc-phat":
			kq=12;
			break;
		case "sinh-tai-loc-phat":
			kq=13;
			break;
		case "sim-than-tai":
			kq=15;
			break;
		case "sim-ong-dia":
			kq=16;
			break;
		case "sim-ganh-dao":
			kq=17;
			break;
		case "sim-soi-guong":
			kq=18;
			break;
		case "sim-nam-sinh":
			kq=19;
			break;
		case "sim-ganh":
			kq=20;
			break;
		case "sim-san-bang-tat-ca":
			kq=21;
			break;
		case "bon-mua-khong-that":
			kq=22;
			break;
		case "sim-doc-nhat-vo-nhi":
			kq=23;
			break;
	}
	return kq;
}
function makeid(length) {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}
function getCurrentPageURL(req, res){
	var urlParts = url.parse(req.url, true, true);
	var pathname = urlParts.pathname;
	var username = pathname.slice(1);
	var arr=pathname.split("&p=");
	return arr[0];
}
function getCurrentPageURLFilter(req, res){
	var urlParts = url.parse(req.url, true, true);
	var pathname = urlParts.pathname;
	var username = pathname.slice(1);
	var arr=pathname.split("&filter=");
	return arr[0];
}
module.exports = router;
