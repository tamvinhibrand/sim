var q= require("q");
var express = require('express');
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;

var setting=mongoose.Schema({
    ten_vi: {type: String},
    dienthoai_vi: {type: String},
    dichi_vi: {type: String},
    slogan_vi: {type: String},
    website: {type: String},
    toado: {type: String},
    facebook: {type: String},
    twitter: {type: String},
    google: {type: String},
    email: {type: String},
    youtube: {type: String},
    hotline: {type: String},
    ten_hl1: {type: String},
    gg: {type: String},
    meta: {type: String},
    h1_vi: {type: String},
    h2_vi: {type: String},
    h3_vi: {type: String},
    h4_vi: {type: String},
    h5_vi: {type: String},
    h6_vi: {type: String},
    title_vi: {type: String},
    keywords_vi: {type: String},
    description_vi: {type: String},
    fav: {type: String},
}, {collection : 'setting'});
module.exports = mongoose.model('setting', setting);
