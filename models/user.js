var q= require("q");
var express = require('express');
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;

var Schema=mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    hienthi:{type: Number},
    role:{type: Number},
}, {collection : 'user'});
module.exports = mongoose.model('Schema', Schema);
