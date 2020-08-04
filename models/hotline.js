var q= require("q");
var express = require('express');
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;

var hotline=mongoose.Schema({
    ten_vi: {type: String},
    skype: {type: String},
    dienthoai: {type: String},
    email: {type: String},
    type: {type: String},
    stt: {type: Number},
    hienthi: {type: Number},
    noibat: {type: Number},
    ngaysua: {type: Number},
    Ngaytao: {type: Number},
}, {collection : 'hotline'});
module.exports = mongoose.model('hotline', hotline);
