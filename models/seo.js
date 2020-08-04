var q= require("q");
var express = require('express');
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;

var seo=mongoose.Schema({
    ten: {type: String},
    url: {type: String},
    noidung: {type: String},
    hienthi: {type: Number},
    Ngaytao: {type: Number},
    title: {type: String},
    keywords: {type: String},
    description: {type: String},
}, {collection : 'seo'});
module.exports = mongoose.model('seo', seo);
