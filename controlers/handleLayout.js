var logo_md= require("../models/header");
var md_setting= require("../models/setting");
var md_price= require("../models/price");
var md_hotline= require("../models/hotline");
var md_hotline1= require("../models/hotline1");
var md_content= require("../models/content");
var md_banking= require("../models/banking");
var md_article= require("../models/article");
var md_sim_vip= require("../models/sim_vip");
var md_sim_giare= require("../models/sim_giare");
exports.loadSetting = () => {
    return new Promise((resolve, reject) => {
        md_setting.findOne({}).exec(function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })

};
exports.loadLogo = () => {
    return new Promise((resolve, reject) => {
        logo_md.findOne({}).exec(function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};
exports.loadPrice = () => {
    return new Promise((resolve, reject) => {
        md_price.find({hienthi: 1}).sort( { stt: 1 } ).exec(function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};
exports.loadHotlineTop = () => {
    return new Promise((resolve, reject) => {
        md_hotline.find({}).sort( { stt: 1 } ).exec(function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};
exports.loadHotlineMB = () => {
    return new Promise((resolve, reject) => {
		md_hotline1.find({}).sort( { stt: 1 } ).exec(function(err, data) {
            var r = Math.floor(Math.random() * data.length);
			md_hotline1.find({}).sort( { stt: 1 } ).skip(r).limit(1).exec(function(err, data) {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
        });
    });
};

exports.loadHotlineLeft = () => {
    return new Promise((resolve, reject) => {
        md_content.findOne({type:"hotline"}).exec(function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};
exports.loadBank = () => {
    return new Promise((resolve, reject) => {
        md_banking.find({}).sort( { stt: 1 } ).exec(function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};
exports.loadSimVIP = () => {
    return new Promise((resolve, reject) => {
        md_sim_vip.find({}).sort( { stt: 1 } ).sort( { gia: 1 } ).limit(50).exec(function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};
exports.loadSimRe = () => {
    return new Promise((resolve, reject) => {
        md_sim_giare.find({}).sort( { stt: 1 } ).sort( { gia: 1 } ).limit(50).exec(function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};
exports.loadNewsLeft = () => {
    return new Promise((resolve, reject) => {
        md_article.find({type:"tintuc", noibat: 1, hienthi: 1}).sort( { stt: 1,_id: 1 } ).limit(8).exec(function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};
exports.loadKienThuc = () => {
    return new Promise((resolve, reject) => {
        md_article.find({type:"kienthuc", noibat: 1, hienthi: 1}).sort( { stt: 1,_id: 1 } ).limit(8).exec(function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};
exports.loadTTNhaMang = () => {
    return new Promise((resolve, reject) => {
        md_article.find({type:"thongtin", noibat: 1, hienthi: 1}).sort( { stt: 1,_id: 1 } ).limit(8).exec(function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};