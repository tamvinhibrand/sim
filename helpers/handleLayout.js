var handleLayout = require('../controlers/handleLayout');
module.exports = (req, res, next) => {
    if (req.session.isLogged === undefined) {
        req.session.isLogged = false;
    }
    var Setting = handleLayout.loadSetting();
    var logo = handleLayout.loadLogo();
    var hotlineTop=handleLayout.loadHotlineTop();
    var hotlineLeft=handleLayout.loadHotlineLeft();
    var hotlineMb=handleLayout.loadHotlineMB();
    var kienthuc=handleLayout.loadKienThuc();
    var banking= handleLayout.loadBank();
    var newsLeft=handleLayout.loadNewsLeft();
    var thongtin=handleLayout.loadTTNhaMang();
    var simvip=handleLayout.loadSimVIP();
    var simre=handleLayout.loadSimRe();
    var price= handleLayout.loadPrice();

    Promise.all([Setting, logo, hotlineTop, hotlineLeft, hotlineMb, kienthuc, banking, newsLeft, thongtin, simvip, simre, price]).then(([SettingRow, logoRow, hotlineTopRow, hotlineLeftRow, hotlineMbRow, kienthucRow, bankRow, newsLeftRow, thongtinRow, simVIPRow, simreRow, priceRow]) =>{
        res.locals.layoutVM = {
            Setting : SettingRow,
            logo : logoRow,
            hotlineTop : hotlineTopRow,
            hotlineLeft : hotlineLeftRow,
            hotlineMb : hotlineMbRow,
            kienthuc : kienthucRow,
            banking : bankRow,
            newsLeft : newsLeftRow,
            thongtin : thongtinRow,
            simvip : simVIPRow,
            simre : simreRow,
            price : priceRow
        };
        next();
    });
};