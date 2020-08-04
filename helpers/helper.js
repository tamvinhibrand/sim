var bcrypt= require("bcrypt");
var config= require("config");
var saltRounds = config.get("salt");
var in_array = require('in_array');

function checkInArr(x, arr) {
    if(in_array(x, arr) ){
        return x;
    }else{
        return 0;
    }
}
function connectDb() {
   /* mongoose.connect('mongodb://localhost:27017/simcuatui');
    var db = mongoose.connection;*/

    var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect("mongodb://localhost:27017/simcuatui", function(err, db) { console.log("A");
        if (err) throw err;
        return db;
    });
}
function  hash_password(password) {
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(password, salt);

    return hash;
}
function compare_password(password, hash){
    return bcrypt.compareSync(password, hash);
}
function phanloaisim(sim){

    var sub1=sim.substr(-1,1);
    var sub2=sim.substr(-2,1);
    var sub3=sim.substr(-3,1);
    var sub4=sim.substr(-4,1);
    var sub5=sim.substr(-5,1);
    var sub6=sim.substr(-6,1);
    var sub7=sim.substr(-7,1);
    var sub8=sim.substr(-8,1);
    var loaisim='';
    //Sim Lục Quý
    if(sub1==sub2 && sub2==sub3 && sub3==sub4 && sub4==sub5 && sub5==sub6){loaisim+='24|';}
    //Sim Ngũ Quý
    if(sub1==sub2 && sub2==sub3 && sub3==sub4 && sub4==sub5){loaisim+='25|';}
    //Sim Tứ Quý
    if(sub1==sub2 && sub2==sub3 && sub3==sub4){loaisim+='26|';}
    //Sim Tam Hoa
    if(sub1==sub2 && sub2==sub3){loaisim+='27|';}
    //Sim Tam Hoa Kép
    if(sub1==sub2 && sub2==sub3 && sub4==sub5 && sub5==sub6){loaisim+='28|';}
    //Sim Sảnh Tiến
    if(sub1>sub2 && sub2>sub3){loaisim+='29|';}
    //Sim Lặp
    if((sub5==sub2 && sub4==sub1) || (sub6==sub3 && sub5==sub2) || (sub4==sub1 && sub3==sub2) || (sub6==sub5 && sub3==sub2) || (sub5==sub4 && sub1==sub2) || (sub5==sub3==sub1) || (sub6==sub4==sub2) ){loaisim+='30|';}
    //Sim Taxi
    if((sub6==sub4 && sub4==sub2 && sub5==sub3 && sub3==sub1) || (sub6==sub4 && sub4==sub3 && sub3==sub1 && sub2==sub5) || (sub6==sub5 && sub5==sub3 && sub3==sub2 && sub1==sub4) || (sub1==sub5 && sub5==sub4 && sub4==sub2 && sub6==sub3) || (sub8==sub4 && sub7==sub3 && sub6==sub2 && sub5==sub1)){ loaisim+='31|';}
    //Sim Kép
    if(sub6==sub5 && sub4==sub3 && sub2==sub1){loaisim+='32|';}
    //Ngũ Quý Giữa
    if(sub2==sub3 && sub3==sub4 && sub4==sub5 && sub5==sub6 && sub1!=sub2 && sub6 !=sub7){loaisim+='10|';}
    //Tứ Quý Giữa
    if(sub2==sub3 && sub3==sub4 && sub4==sub5 && sub1!=sub2 && sub6!=sub5){loaisim+='11|';}
    //Sim Lộc Phát
    if(sub2==6 && sub1==8){loaisim+='12|';}
    //Sinh Tài Lộc Phát
    if(sub2==6 && sub1==8 && sub4==1 && sub3==3){loaisim+='13|';}
    //Phát Tài Phát Lộc
    if(sub2==6 && sub1==8 && sub4==8 && sub3==3){loaisim+='14|';}
    //Sim Thần Tài
    if((sub1==9 && sub2==3) || (sub1==9 && sub3==7)){loaisim+='15|';}
    //Sim Ông Địa
    if((sub1==8 && sub2==3) || (sub1==8 && sub3==7)){loaisim+='16|';}
    //Sim Gánh Đảo
    if(sub1==sub4 && sub2==sub3){loaisim+='17|';}
    //Sim Soi Gương
    if(sub1==sub6 && sub2==sub5 && sub3==sub4){loaisim+='18|';}
    //Sim năm sinh
    var today = new Date().getFullYear();
    //$nam=date("Y", time());
    var subYear=sim.substr( -4);
    if(subYear>=1950 && subYear<=today){loaisim+='19|';}
    //Sim Gánh
    if(sub6==sub4 && sub3==sub1 && sub1!=sub2 && sub6!=sub5){loaisim+='20|';}
    //Sim San Bằng Tất Cả
    if(subYear=='6789'){loaisim+='21|';}
    //Bốn Mùa Không Thất
    if(subYear=='4078'){loaisim+='22|';}
    //Sim Độc Nhất Vô Nhị
    if(subYear=='1102'){loaisim+='23|';}
    return loaisim;
};
function convertSim(sim){
    var sim_import=sim.replace(/\./g,"");
    sim_import=sim_import.replace(/\,/g,"");
    sim_import= sim_import.trim();

    if(sim_import.substr(0,1)==0){
        if(sim_import.substr(0,2)==1){
            $lengt0=11-sim_import.length;
            for($m=0;$m<$lengt0;$m++){
                sim=sim+"0";
            }
        }else{
            $lengt0=10-sim_import.length;
            for($m=0;$m<$lengt0;$m++){
                sim=sim+"0";
            }
        }
    }else{
        sim="0"+sim;
        if(sim_import.substr(0,1)==1){
            sim_import="0"+sim_import;
            $lengt0=11-sim_import.length;
            sim="0"+sim;
            for($m=0;$m<$lengt0;$m++){
                sim=sim+"0";
            }
        }else{
            sim_import="0"+sim_import;
            $lengt0=10-sim_import.length;
            sim="0"+sim;
            for($m=0;$m<$lengt0;$m++){
                sim=sim+"0";
            }
        }
    }
    return sim;
}
function convertSimfull(sim){
    sim=sim.trim();
    var sim_import=sim.replace(/\./g,"");
    sim_import=sim_import.replace(/\,/g,"");
    return sim_import;
}
function phanloaimang(sim){
    var mangs='';
    var dauso3=sim.substr( 0, 3);
    var dauso4=sim.substr( 0, 4);
    if(in_array(dauso3, ['089', '090', '093', '0120', '0121', '0122','0126', '0128','070','079','077','076','078']) || in_array(dauso4, ['089', '090', '093', '0120', '0121', '0122','0126', '0128','070','079','077','076','078']) ){
        mangs="mobifone";
    }
    if(in_array(dauso3, ['088', '091', '094', '0123', '0125', '0127', '0129', '0124','081','082','083','084','085']) || in_array(dauso4, ['088', '091', '094', '0123', '0125', '0127', '0129', '0124','081','082','083','084','085']) ){
        mangs="vinaphone";
    }
    if(in_array(dauso3, ['092','0188','051','052','053','054','055','056','057','058','059']) || in_array(dauso4, ['092','0188','051','052','053','054','055','056','057','058','059']) ){
        mangs="vietnamobile";
    }
    if(in_array(dauso3, ['086', '096','097','098','0161','0162','0163', '0164','0165','0166','0167','0168','0169','032','033','034','035','036','037','038','039']) || in_array(dauso4, ['086', '096','097','098','0161','0162','0163', '0164','0165','0166','0167','0168','0169','032','033','034','035','036','037','038','039']) ){
        mangs="viettel";
    }
    if(in_array(dauso3, ['0199','099','059']) || in_array(dauso4, ['0199','099','059']) ){
        mangs="gmobile";
    }

    return mangs;
}
module.exports={
    hash_password:hash_password,
    compare_password: compare_password,
    convertSim: convertSim,
    convertSimfull: convertSimfull,
    phanloaisim: phanloaisim,
    phanloaimang: phanloaimang,
    connectDb: connectDb,
    checkInArr:checkInArr
}