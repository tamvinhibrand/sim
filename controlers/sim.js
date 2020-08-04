var q= require("q");
var express= require("express");
var sim_md=require("../models/sim.js");
var daily_ct=require("../controlers/daily.js");
var async = require("async");
var helper=require('../helpers/helper.js');
function loadItems(){
    var defer=q.defer();
    sim_md.find().skip(0).limit(100).exec(function(err, result){
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(result);
        }
    });
    return defer.promise;
}
async function addSim(row,daily, file){
    var defer=q.defer();
    var sim= helper.convertSimfull(helper.convertSim(row.Sim));
    var loai=helper.phanloaisim(sim);
    var mang=helper.phanloaimang(sim);
    var arr_loai=loai.split(",");
    var asiaTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"});
    var now = new Date(asiaTime);

    var sim_arr = new sim_md({
        sim1: row.Sim,
        sim2: sim,
        gia: row.price,
        loaisim: loai,
        mang: mang,
        kieu_26: helper.checkInArr(26,arr_loai),
        kieu_11: helper.checkInArr(11,arr_loai),
        kieu_10: helper.checkInArr(10,arr_loai),
        kieu_25: helper.checkInArr(25,arr_loai),
        kieu_24: helper.checkInArr(24,arr_loai),
        kieu_31: helper.checkInArr(31,arr_loai),
        kieu_19: helper.checkInArr(19,arr_loai),
        kieu_12: helper.checkInArr(12,arr_loai),
        kieu_15: helper.checkInArr(15,arr_loai),
        kieu_16: helper.checkInArr(16,arr_loai),
        kieu_32: helper.checkInArr(32,arr_loai),
        kieu_30: helper.checkInArr(30,arr_loai),
        kieu_17: helper.checkInArr(17,arr_loai),
        kieu_29: helper.checkInArr(29,arr_loai),
        kieu_27: helper.checkInArr(27,arr_loai),
        kieu_28: helper.checkInArr(28,arr_loai),
        kieu_23: helper.checkInArr(23,arr_loai),
        kieu_13: helper.checkInArr(13,arr_loai),
        kieu_22: helper.checkInArr(22,arr_loai),
        kieu_14: helper.checkInArr(14,arr_loai),
        kieu_20: helper.checkInArr(20,arr_loai),
        kieu_18: helper.checkInArr(18,arr_loai),
        kieu_21: helper.checkInArr(21,arr_loai),
        stt: 0,
        file: file,
        ngaytao: now.toLocaleString(),
        hienthi:1,
    });
    await daily_md.findOne({"_id":daily}, function(err, result) {
        sim_arr['daily']=result._id;
        sim_arr['tendaily']=result.ten;
        sim_arr['stt_daily']=result.stt;
    });
    sim_md.save().then(function(err){
        if(err)  defer.reject(err);
    });

    return defer.promise;
}
function removeSimDaily(id) {
    var daily_md=require("../models/daily.js");
    var defer=q.defer();
    var myquery = { 'daily': id };
    sim_md.deleteMany(myquery, function(err, res) {
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(res);
        }
    });
    return defer.promise;
}
function searchSim(key){
    var defer=q.defer();
    var arr_key=key.split("*");
    if(arr_key.length>1){
        var slen1=arr_key[0].length;
        var slen2="duoi"+arr_key[1].length;
        var query={};
        if(slen1>1){
            query={$and : [{ "sim2": {$regex: "^"+arr_key[0]+"+"} },{ "sim2": {$regex: ".+"+arr_key[1]+"$"} }]};
        }else{
            query={"sim2": {$regex: ".+"+arr_key[1]+"$"} };
        }
        console.log(query);

        sim_md.find(query).skip(0).limit(100).exec(function(err, result){
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });
    }else{
        var slen=key.length;
        var query={};
        if(slen>9){
            query["sim2"]= key;
        }else{
            query={"sim2": {$regex: key} }; // search có chuỗi là key
        }
        sim_md.find(query).skip(0).limit(100).exec(function(err, result){
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });
    }
    return defer.promise;
}
function searchSimPage(key,page){
    var defer=q.defer();
    var arr_key=key.split("*");
    if(arr_key.length>1){
        var slen1=arr_key[0].length;
        var slen2="duoi"+arr_key[1].length;
        var query={};
        if(slen1>1){
            query={$and : [{ "sim2": {$regex: "^"+arr_key[0]+"+"} },{ "sim2": {$regex: ".+"+arr_key[1]+"$"} }]};
        }else{
            query={"sim2": {$regex: ".+"+arr_key[1]+"$"} };
        }
        var skip=page*100;
        sim_md.find(query).skip(skip).limit(100).exec(function(err, result){
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });
    }else{
        var slen=key.length;
        var query={};
        if(slen>9){
            /* var dau=key.substr(0, 4);
            var duoi=key.substr(4, 6);
            query["duoi6"]= duoi;
            query["dau4"]= dau; */
            query["sim2"]= key;
        }else{
            query={"sim2": {$regex: key} }; // search có chuỗi là key
            //query={"sim2": {$regex: ".+"+key+"$"} }; search đuôi là key
            //var query = { "sim2" : { $regex: /key/g } };
            //{$and : [{ "sim2": {$regex: "^07+"} },{ "sim2": {$regex: ".+645$"} }]}
            //query["duoi"+key.length]= key;
            console.log(query);
        }
        var skip=page*100;
        sim_md.find(query).skip(skip).limit(100).exec(function(err, result){
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });
    }
    return defer.promise;
}
module.exports={
    loadItems: loadItems,
    searchSim: searchSim,
    addSim: addSim,
    removeSimDaily:removeSimDaily
}