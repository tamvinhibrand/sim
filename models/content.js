var q= require("q");
var express = require('express');
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;

var content=mongoose.Schema({
    ten_vi: {type: String},
    tenkhongdau: {type: String},
    mota_vi: {type: String},
    noidung_vi: {type: String},
    type: {type: String},
    title_vi: {type: String},
    keywords_vi: {type: String},
    description_vi: {type: String},
}, {collection : 'content'});
module.exports = mongoose.model('content', content);
