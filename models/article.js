var q= require("q");
var express = require('express');
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;

var article=mongoose.Schema({
    ten_vi: {type: String},
    tenkhongdau: {type: String},
    mota_vi: {type: String},
    noidung_vi: {type: String},
    type: {type: String},
    stt: {type: Number},
    hienthi: {type: Number},
    noibat: {type: Number},
    ngaysua: {type: Number},
    Ngaytao: {type: Number},
    h1: {type: String},
    h2: {type: String},
    h3: {type: String},
    title_vi: {type: String},
    keywords_vi: {type: String},
    description_vi: {type: String},
}, {collection : 'article'});
module.exports = mongoose.model('article', article);
