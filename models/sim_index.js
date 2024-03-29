var q= require("q");
var express = require('express');
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
var sim_index=mongoose.Schema({
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
    loaisim: {type: String},
    mang: {type: String},
    lucquy: {type: String},
    nguquy: {type: String},
    tuquy: {type: String},
    tamhoa: {type: String},
    tamhoakep: {type: String},
    sanhtien:{type: String},
    simlap: {type: String},
    simtaxi: {type: String},
    simkep: {type: String},
    nguquygiua: {type: String},
    tuquygiua: {type: String},
    locphat: {type: String},
    sinhtailocphat:{type: String},
    phattai: {type: String},
    thantai: {type: String},
    ongdia: {type: String},
    ganhdao: {type: String},
    soiguong: {type: String},
    namsinh: {type: String},
    simganh: {type: String},
    sanbang: {type: String},
    bonmua: {type: String},
    docnhat: {type: String},
    stt: {type: String},
    file: {type: String},
    ngaytao: {type: String},
    hienthi:{type: String},
}, {collection : 'sim_index'});
module.exports = mongoose.model('sim_index', sim_index);
