var q= require("q");
var express = require('express');
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
var price=mongoose.Schema({
    ten: {type: String},
    pricefrom: {type: Number},
    priceto: {type: Number},
    url: {type: String},
    title: {type: String},
    keywords: {type: String},
    description: {type: String},
    stt: {type: Number},
    ngaytao: {type: Number},
    ngaysua: {type: Number},
    hienthi:{type: Number},
}, {collection : 'gia'});
module.exports = mongoose.model('price', price);
