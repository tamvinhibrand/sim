var q= require("q");
var express= require("express");
var daily_md=require("../models/daily.js");
var async = require("async");
/*function loadItems() {
    return new Promise( resolve => {
        daily_md.find().then( pro => {
                resolve( pro );
            })
    })
}*/
function  loadItem(id) {
    var defer=q.defer();
    daily_md.findOne({_id: id}, function(err, result){
        if(err) throw err;
        if(result){
            defer.resolve(result);
        }else{
            defer.reject(err);
        }
    });
    return defer.promise;
}
function updateSim(id, file, count) {
    var defer=q.defer();
    var myquery = { '_id': id };
    var newvalues = { $set: {"file": file, "soluong": count } };
    daily_md.updateOne(myquery, newvalues, function(err, res) {
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(res);
        }
    });
    return defer.promise;
}
function loadItems(){
    var defer=q.defer();
    daily_md.find(function(err, result){
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(result);
        }
    });
    return defer.promise;
}
module.exports={
    loadItems: loadItems,
    updateSim: updateSim,
    loadItem:loadItem
}