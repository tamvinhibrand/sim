var express = require('express');
var router = express.Router();
var Muser= require('../models/user');
var helper= require('../helpers/helper.js');
var session = require('express-session');
var passport = require('passport');
var async = require("async");
var q= require("q");
// require đại lý
var daily_md= require('../models/daily');
var daily_ct= require('../controlers/daily');
// require sim
var sim_md= require('../models/sim');
var sim_ct= require('../controlers/sim');


router.get("/",checkLoginAdmin,function(req, res, next){
    res.render("admin/index");
});
router.get("/login.html", function(req, res, next){
    res.render("admin/login",{data:{}});
});
router.get("/logout.html", function(req, res, next){
    req.session.destroy();
    res.redirect('/admin/login.html');
});
router.get("/register.html", function(req, res){
    res.render("admin/register", {data:{}});
});
router.post("/register.html", function(req, res){
    var user= req.body;


    if(user.username.trim().length==0){
        res.render("admin/register", {data:{error:"Chưa nhập Username"}});
    }
    if(user.password.trim().length!=0 && user.password!=user.re_password){
        res.render("admin/register", {data:{error: "Nhập lại mật khẩu không đúng"}});
    }
    var password= helper.hash_password(req.body.password);
    //add dữ liệu
    var usr = new Muser({
        name 			: req.body.ten,
        username 	    : req.body.username,
        password 		: password,
        email 			: req.body.email,
        hienthi 		: 1,
        role 			: 1,
        created 		: 0
    });

    Muser.findOne({username: req.body.username}, function(err, result){
        if(err) throw err;
        if(!result){
            usr.save().then(function(){
                res.redirect('/admin/login.html');
            });
        }else{
            res.render("admin/register", {data:{error: "Tài khoản đã tồn tại"}});
        }
    });
});
router.post("/login.html", function(req, res){
    var user= req.body;
    if(user.username.trim().length==0){
        res.render("admin/login", {data:{error:"Chưa nhập Username"}});
    }else{
        Muser.findOne({username: user.username}, function(err, result){
            if(err) throw err;
            if(result){
                var status = helper.compare_password(user.password, result.password);
                if(!status){
                    res.render("admin/login", {data:{error:"Nhập sai mật khẩu"}});
                }else{
                    var sessData = req.session;
                    sessData.user={
                        "username": result.username,
                        "name": result.name,
                        "role": result.role
                    };
                    res.redirect("/admin/");
                }
            }else{
                res.render("admin/login", {data:{error:"Username không tồn tại"}});
            }
        });
    }
});
function checkLoginAdmin(req, res, next){
    console.log(req.session.user);
    if(!req.session.user){
        res.redirect('/admin/login.html');
    }else{
        next();
    }
}


// router đại lý
router.get('/daily',checkLoginAdmin, function (req, res) {
    var param=daily_ct.loadItems();
    param.then(function(items){
        var data={
            "items":items,
            "error": false
        };
        res.render("admin/daily/items", {data:data});
    }).catch(function (err) {
        res.render("admin/daily/items", {data:{error:true}});
    })
});
// router sim
router.get('/sim', function (req, res) {
    var param=sim_ct.loadItems();
    console.log(param);
    param.then(function(items){
        var data={
            "items":items,
            "error": false
        };
        //console.log(data);
        res.render("admin/sim/items", {data:data});
    }).catch(function (err) {
        res.render("admin/sim/items", {data:{error:true}});
    })
});
router.post('/sim', function (req, res) {
    var param=sim_ct.searchSim(req.body.keyword);
    console.log(req.body.keyword);
    param.then(function(items){
        var data={
            "items":items,
            "error": false
        };
        console.log(data);
        res.render("admin/sim/items", {data:data});
    }).catch(function (err) { console.log(err);
        res.render("admin/sim/items", {data:{error:true}});
    })
});
router.get("/import", function (req, res) {
    var daily=daily_ct.loadItems();
    daily.then(function (item) {
        var dailys={"item": item, "error": false};
        res.render("admin/sim/upload_sim", {data:dailys});
    }).catch(function (err) {
        res.render("admin/sim/upload_sim", {data:{error:true}});
    })
});
const csv = require('csv-parser');
const fs = require('fs');

var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
});
var upload = multer({ storage: storage });
var fcsv = require('fast-csv');
var parse = require('csv-parse');
router.post("/import",upload.single('file'), async function (req, res) {
    var file='public/upload/'+req.file.filename;
    var daily=req.body.daily;
    var output=[];var arr_sim=[];
    var stream = fs.createReadStream(file);
    var datas=[];
    var daily_items=daily_ct.loadItems();
    await daily_items.then(function (item) {
        datas["item"]=item;
    });

    var asiaTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"});
    var now = new Date(asiaTime);

    var remove_sim= sim_ct.removeSimDaily(daily);
    remove_sim.then(async function (items) {
        if(error){
            throw error;
        }
    });
    var csvStream = fcsv.parse()
        .on("data", async function(csvrow){
            //arr_sim=arr_sim.concat(data);
            output.push(csvrow);
            //console.log(csvrow[0]);
        }).on("end", async function(){
            //console.log(output);
            for( var i=1; i<output.length; i++){
                //console.log(output[i][0]);
                var simfull=helper.convertSimfull(helper.convertSim(output[i][0]));
                var arr_sim = new sim_md({
                    sim1: output[i][0],
                    sim2: helper.convertSimfull(helper.convertSim(output[i][0])),
                    gia: output[i][1],
                    loaisim: output[i][2],
                    mang: output[i][3],
                    lucquy: output[i][4],
                    nguquy: output[i][5],
                    tuquy: output[i][6],
                    tamhoa: output[i][7],
                    tamhoakep: output[i][8],
                    sanhtien: output[i][9],
                    simlap: output[i][10],
                    simtaxi: output[i][11],
                    simkep: output[i][12],
                    nguquygiua: output[i][13],
                    tuquygiua: output[i][14],
                    locphat: output[i][15],
                    sinhtailocphat: output[i][16],
                    phattai: output[i][17],
                    thantai: output[i][18],
                    ongdia: output[i][19],
                    ganhdao: output[i][20],
                    soiguong: output[i][21],
                    namsinh: output[i][22],
                    simganh: output[i][23],
                    sanbang: output[i][24],
                    bonmua: output[i][25],
                    docnhat: output[i][26],
                    tendaily: output[i][28],
                    daily: output[i][27],
                    stt_daily: output[i][29],
                    stt: 0,
                    file: req.file.filename,
                    ngaytao: now.toLocaleString(),
                    hienthi:1,
                    dau2: output[i][30],
                    dau3: output[i][31],
                    dau4: output[i][32],
                    dau5: output[i][33],
                    dau6: output[i][34],
                    dau7: output[i][35],
                    dau8: output[i][36],
                    dau9: output[i][37],
                    duoi2: output[i][38],
                    duoi3: output[i][39],
                    duoi4: output[i][40],
                    duoi5: output[i][41],
                    duoi6: output[i][42],
                    duoi7: output[i][43],
                    duoi8: output[i][44],
                    duoi9: output[i][45],
                });
                /*dau2: simfull.substr(1,2),
                    dau3: simfull.substr(1,3),
                    dau4: simfull.substr(1,4),
                    dau5: simfull.substr(1,5),
                    dau6: simfull.substr(1,6),
                    dau7: simfull.substr(1,7),
                    dau8: simfull.substr(1,8),
                    dau9: simfull.substr(1,9),
                    duoi2: simfull.substr(-1,2),
                    duoi3: simfull.substr(-1,3),
                    duoi4: simfull.substr(-1,4),
                    duoi5: simfull.substr(-1,5),
                    duoi6: simfull.substr(-1,6),
                    duoi7: simfull.substr(-1,7),
                    duoi8: simfull.substr(-1,8),
                    duoi9: simfull.substr(-1,9),*/
                arr_sim.save(function(error){
                    //console.log(arr_sim);
                    if(error){
                        throw error;
                    }
                });
            };
            var update_dl=daily_ct.updateSim(daily, req.file.filename, output.length);
            update_dl.then(async function (items) {
                datas["error"]= false;
                datas["mes"]= "Import thành công";
                res.render("admin/sim/upload_sim", {data:datas});
            }).catch(function (err) {
                datas["error"]= true;
                datas["mes"]= "Import thất bại";
                res.render("admin/sim/upload_sim", {data:datas});
            });
        });

    stream.pipe(csvStream);
    fs.unlink('public/upload/'+req.file.filename, function(e){
        if(e) throw e;
    });
});
async function readCSV(file, daily) {
    var defer=q.defer();
    let output=[];
    var arr_sim=[];
    var stream = fs.createReadStream(file);
    /*await daily_md.findOne({"_id":daily}, function(err, result) {
       arr_sim['daily']=result._id;
       arr_sim['tendaily']=result.ten;
       arr_sim['stt_daily']=result.stt;
   });*/
    var csvStream = fcsv.parse()
        .on("data", async function(data){
            output=output.concat(data);
            //console.log(data);
        }).on("end", function(){
            defer.resolve(output);
        });

    await stream.pipe(csvStream);
    /*var remove_sim= sim_ct.removeSimDaily(daily);
    remove_sim.then(async function (items) {
        await fs.createReadStream('public/upload/'+file).pipe(csv()).on('data', (row) => {
            output=output.concat(row);
            //sim_ct.addSim(row, daily, file);
            dem++;
        }).on('end', () => {
            defer.resolve(output);
        });
    }).catch(function (err) {
        defer.reject(err);
    })*/

    return defer.promise;
}
async function laydata(arr,daily){
    var defer=q.defer();
    await daily_md.findOne({"_id":daily}, function(err, result) {
        arr['daily']=daily;
        arr['tendaily']=result.ten;
        arr['stt_daily']=result.stt;
        defer.resolve(arr);
    });
    return defer.promise;
}
module.exports = router;