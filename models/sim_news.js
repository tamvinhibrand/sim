var q= require("q");
var express = require('express');
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
var sim_news=mongoose.Schema({
    sim1: {type: String},
    sim2: {type: String},
    gia: {type: Number},
    dau2: {type: String},
    dau3: {type: String},
    dau4: {type: String},
    dau5: {type: String},
    dau6: {type: String},
    dau7: {type: String},
    dau8: {type: String},
    dau9: {type: String},
    duoi2: {type: String},
    duoi3: {type: String},
    duoi4: {type: String},
    duoi5: {type: String},
    duoi6: {type: String},
    duoi7: {type: String},
    duoi8: {type: String},
    duoi9: {type: String},
    daily: {type: String},
    tendaily: {type: String},
    stt_daily: {type: String},
	mang: {type: String},
    v90: {type: Number},
    stt: {type: Number},
    file: {type: String},
    ngaytao: {type: String},
    hienthi:{type: Number},
}, {collection : 'sim_news'});
module.exports = mongoose.model('sim_news', sim_news);
