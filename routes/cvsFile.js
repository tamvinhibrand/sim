var express = require('express');
var helper= require('../helpers/helper.js');
var router = express.Router();
var async = require("async");
var daily_ct= require('../controlers/daily');
var daily_md= require('../models/daily');
var q= require("q");

router.get("/", function (req, res) {
    var daily=daily_ct.loadItems();
    daily.then(function (item) {
        var dailys={"item": item, "error": false};
        res.render("create", {data:dailys});
    }).catch(function (err) {
        res.render("create", {data:{error:true}});
    })
});
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
router.post("/",upload.single('file'), async function (req, res) {
    var fs = require('fs');
    var parse = require('csv-parse');
    var daily=req.body.daily;
    var file='public/upload/'+req.file.filename;
    var filedown='public/upload/download/'+req.file.filename;
    var csvData=[];var exportData=[];
    var datas=[];
    var daily_items=daily_ct.loadItems();
    await daily_items.then(function (item) {
        datas["item"]=item;
    });
    fs.createReadStream(file).pipe(parse({delimiter: ':'}))
        .on('data', await function(csvrow) {
            csvData.push(csvrow);
        })
        .on('end', async function() {
            var daily_item=daily_ct.loadItem(daily);
            var tendaily, stt_daily;
            await daily_md.findOne({"_id":daily}, function(err, result) {
                tendaily=result.ten;
                stt_daily=result.stt;
            });
            //do something wiht csvData
            //console.log(csvData);
            for( var i=0; i<csvData.length; i++){
                var sim1=csvData[i][0];
                //var res = csvData[i].split(",");
                var res=sim1.split(",");
                var simfull=res[0];
                var price=res[1];
                var sim= helper.convertSimfull(helper.convertSim(simfull));
                var loai=helper.phanloaisim(sim);
                var mang=helper.phanloaimang(sim);
                var arr_loai=loai.split("|");
                var test=helper.checkInArr(26,arr_loai);
                var data1=
                    {
                        sim1: simfull,
                        gia: price,
                        loaisim: arr_loai,
                        mang: mang,
                        lucquy: helper.checkInArr(24,arr_loai),
                        nguquy: helper.checkInArr(25,arr_loai),
                        tuquy: helper.checkInArr(26,arr_loai),
                        tamhoa: helper.checkInArr(27,arr_loai),
                        tamhoakep: helper.checkInArr(28,arr_loai),
                        sanhtien: helper.checkInArr(29,arr_loai),
                        simlap: helper.checkInArr(30,arr_loai),
                        simtaxi: helper.checkInArr(31,arr_loai),
                        simkep: helper.checkInArr(32,arr_loai),
                        nguquygiua: helper.checkInArr(10,arr_loai),
                        tuquygiua: helper.checkInArr(11,arr_loai),
                        locphat: helper.checkInArr(12,arr_loai),
                        sinhtailocphat: helper.checkInArr(13,arr_loai),
                        phattai: helper.checkInArr(14,arr_loai),
                        thantai: helper.checkInArr(15,arr_loai),
                        ongdia: helper.checkInArr(16,arr_loai),
                        ganhdao: helper.checkInArr(17,arr_loai),
                        soiguong: helper.checkInArr(18,arr_loai),
                        namsinh: helper.checkInArr(19,arr_loai),
                        simganh: helper.checkInArr(20,arr_loai),
                        sanbang: helper.checkInArr(21,arr_loai),
                        bonmua: helper.checkInArr(22,arr_loai),
                        docnhat: helper.checkInArr(23,arr_loai),
                        ten_daily: tendaily,
                        id_daily: daily,
                        stt_daily: stt_daily,
                        dau2: sim.substr(0,2).toString(),
                        dau3: sim.substr(0,3).toString(),
                        dau4: sim.substr(0,4).toString(),
                        dau5: sim.substr(0,5).toString(),
                        dau6: sim.substr(0,6).toString(),
                        dau7: sim.substr(0,7).toString(),
                        dau8: sim.substr(0,8).toString(),
                        dau9: sim.substr(0,9).toString(),
                        duoi2: sim.substr(-2).toString(),
                        duoi3: sim.substr(-3).toString(),
                        duoi4: sim.substr(-4).toString(),
                        duoi5: sim.substr(-5).toString(),
                        duoi6: sim.substr(-6).toString(),
                        duoi7: sim.substr(-7).toString(),
                        duoi8: sim.substr(-8).toString(),
                        duoi9: sim.substr(-9).toString()
                    };
                exportData.push(data1);
                //console.log(exportData,"A");
            }
            const createCsvWriter = require('csv-writer').createObjectCsvWriter;
            const csvWriter = createCsvWriter({
                path: 'public/upload/download/'+req.file.filename,
                header: [
                    {id: 'sim1', title: 'Sim1'},
                    {id: 'gia', title: 'Gia'},
                    {id: 'loaisim', title: 'Loai sim'},
                    {id: 'mang', title: 'Mang'},
                    {id: 'lucquy', title: 'Luc quy'},
                    {id: 'nguquy', title: 'Ngu quy'},
                    {id: 'tuquy', title: 'Tu quy'},
                    {id: 'tamhoa', title: 'Tam hoa'},
                    {id: 'tamhoakep', title: 'Tam hoa kep'},
                    {id: 'sanhtien', title: 'Sanh tien'},
                    {id: 'simlap', title: 'Sim lap'},
                    {id: 'simtaxi', title: 'Sim taxi'},
                    {id: 'simkep', title: 'Sim kep'},
                    {id: 'nguquygiua', title: 'Ngu quy giua'},
                    {id: 'tuquygiua', title: 'Tu quy giua'},
                    {id: 'locphat', title: 'Sim loc phat'},
                    {id: 'sinhtailocphat', title: 'Sinh tai loc phat'},
                    {id: 'phattai', title: 'Sim phat tai phat loc'},
                    {id: 'thantai', title: 'Sim than tai'},
                    {id: 'ongdia', title: 'Sim ong dia'},
                    {id: 'ganhdao', title: 'Sim ganh dao'},
                    {id: 'soiguong', title: 'Sim soi guong'},
                    {id: 'namsinh', title: 'Sim nam sinh'},
                    {id: 'simganh', title: 'Sim ganh'},
                    {id: 'sanbang', title: 'Sim san bang tat ca'},
                    {id: 'bonmua', title: 'Sim bon mua khong that'},
                    {id: 'docnhat', title: 'Sim doc nhat vo nhi'},
                    {id: 'id_daily', title: 'id_daily'},
                    {id: 'ten_daily', title: 'Ten dai ly'},
                    {id: 'stt_daily', title: 'STT dai ly'},
                    {id: 'dau2', title: 'dau 2'},
                    {id: 'dau3', title: 'dau 3'},
                    {id: 'dau4', title: 'dau 4'},
                    {id: 'dau5', title: 'dau 5'},
                    {id: 'dau6', title: 'dau 6'},
                    {id: 'dau7', title: 'dau 7'},
                    {id: 'dau8', title: 'dau 8'},
                    {id: 'dau9', title: 'dau 9'},
                    {id: 'duoi2', title: 'duoi 2'},
                    {id: 'duoi3', title: 'duoi 3'},
                    {id: 'duoi4', title: 'duoi 4'},
                    {id: 'duoi5', title: 'duoi 5'},
                    {id: 'duoi6', title: 'duoi 6'},
                    {id: 'duoi7', title: 'duoi 7'},
                    {id: 'duoi8', title: 'duoi 8'},
                    {id: 'duoi9', title: 'duoi 9'},
                ]
            });
            const data = exportData;
            csvWriter.writeRecords(data).then(()=> console.log('The CSV file was written successfully'));
        });
    fs.unlink('public/upload/'+req.file.filename, function(e){
        if(e) throw e;
    });

    datas["error"]= true;
    datas["mes"]= "Import susccess";
    datas["path"]= filedown;
    res.render("create", {data:datas});
});

module.exports = router;