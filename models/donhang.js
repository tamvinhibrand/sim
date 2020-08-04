var q= require("q");
var express = require('express');
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
var donhang=mongoose.Schema({
    madonhang: {type: String},
    hoten: {type: String},
    dienthoai: {type: String},
    diachi: {type: String},
    email: {type: String},
    noidung: {type: String},
    ghichu: {type: String},
    tonggia: {type: Number},
    tinhtrang: {type: String},
    ngaycapnhat: {type: String},
    sim: {type: String},
	sim1: {type: String},
    daily: {type: String},
    filesim: {type: String},
    user_order: {type: String},
    user_xuly: {type: String},
    ngaytao: {type: String},
    soluong:{type: Number},
    hienthi:{type: Number},
}, {collection : 'donhang'});
module.exports = mongoose.model('donhang', donhang);
