var q= require("q");
var express = require('express');
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;

var logo=mongoose.Schema({
    logo: {type: String},
    photo_vi: {type: String},
    photo_mobi: {type: String},
    com: {type: String},
}, {collection : 'photo'});
module.exports = mongoose.model('logo', logo);
