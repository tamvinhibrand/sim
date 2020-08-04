function numberFormat(num, ext) {
	ext = (!ext) ? ' ' : ext;
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ext;
}
function executeComma(a, b) {
    a.keyCode >= 96 && a.keyCode <= 105 ? executeComma2(b) : a.keyCode >= 48 && a.keyCode <= 57 ? executeComma2(b) : 8 != a.keyCode && 46 != a.keyCode && 8 != a.keyCode && 9 != a.keyCode || executeComma2(b)
}

function isEmpty(a, b) {
    return "" == a && ("undefined" != typeof b && alert(b), !0)
}

function isPhone(a, b) {
    return !(11 == a.length && 1 == a.substr(0, 2) || 10 == a.length && 9 == a.substr(0, 2)|| 10 == a.length && 3 == a.substr(0, 2)|| 10 == a.length && 5 == a.substr(0, 2)|| 10 == a.length && 7 == a.substr(0, 2) || 10 == a.length && 8 == a.substr(0, 2)) && ("undefined" != typeof b && alert(b), !0)
}

function isEmail(a, b) {
    return emailRegExp = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.([a-z]){2,4})$/, !emailRegExp.test(a) && ("undefined" != typeof b && alert(b), !0)
}

function isSpace(a, b) {
    for (var c = 0; c < a.length; c++)
        if (" " == a.charAt(c)) return "undefined" != typeof b && alert(b), !0;
    return !1
}

function isCharacters(a, b) {
    if ("" == a) return !1;
    var c = /^[a-zA-Z0-9-]+$/;
    return !c.test(a) && ("undefined" != typeof b && alert(b), !0)
}

function isRepassword(a, b, c) {
    return "" != b && (a != b && ("undefined" != typeof c && alert(c), !0))
}

function isCharacterlimit(a, b, c, d) {
    return "" != a && (c = parseInt(c), d = parseInt(d), !(a.length >= c && a.length <= d) && ("undefined" != typeof b && alert(b), !0))
}

function add_popup(a) {
    $("body").append('<div class="login-popup"><div class="close-popup"></div><div class="popup_thongbao"><p class="tieude_tb">Thông báo</p><p class="popup_kq">' + a + "</p></div></div>"), $(".thongbao").html(""), $(".login-popup").fadeIn(300), $(".login-popup").width($(".popup_thongbao").width() + "px");
    var b = $(".login-popup").width() / 2;
    return $(".login-popup").css({
        width: $(".popup_thongbao").width() + "px",
        "margin-left": -b,
        top: "-100px"
    }), $(".login-popup").animate({
        top: "100px"
    }, 500), $("body").append('<div id="baophu"></div>'), $("#baophu").fadeIn(300), !1
}
$(document).ready(function() {
    $(".search_form_control1").mousedown(function() {
        $(".search_help").show()
    }), $(".search_form_control1").blur(function() {
        $(".search_help").hide()
    })
}), $(document).ready(function(a) {
    $(".search_nha_mang").change(function(a) {
        var b = $(this).val(),
            c = "ajax/get_dau_so.php?id=" + b;
        $(".search_dau_so").load(c)
    })
}), $(document).ready(function(a) {
    $(".antimkiem").click(function(a) {
        $(".search_more").stop().slideToggle()
    }), $(".frm_simngaysinh .btn-search").click(function() {
        return 0 == $(".frm_simngaysinh .day").val() ? (alert("Vui lòng chọn ngày sinh"), !1) : 0 == $(".frm_simngaysinh .month").val() ? (alert("Vui lòng chọn tháng sinh"), !1) : 0 == $(".frm_simngaysinh .year").val() ? (alert("Vui lòng chọn năm sinh"), !1) : void 0
    })
}),  $(document).ready(function() {
    function a() {
        try {
            $.browserSelector(), $("html").hasClass("chrome") && $.smoothScroll()
        } catch (a) {}
    }
    setTimeout(function() {
        $("#pre-loader").fadeOut(1e3)
    }, 400), $("body").append('<div id="toptop" title="Lên đầu trang">Back to Top</div>'), $(window).scroll(function() {
        0 != $(window).scrollTop() ? $("#toptop").fadeIn() : $("#toptop").fadeOut()
    }), $("#toptop").click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 500)
    }), a(), $("#baophu, .close-popup").click(function() {
        $("#baophu, .login-popup").fadeOut(300, function() {
            $("#baophu").remove(), $(".login-popup").remove()
        })
    })
	$(".search_form_submit").click(function(){
		if($("#keysim").val()==""){
			alert("Vui lòng nhập sim cần tìm");
			return false;
		}
	})
});
function numberFormat(num, ext) {
        ext = (!ext) ? '  VNĐ' : ext;
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ext;
    }
function textboxChange(tb, f, sb)
{
    if (!f)
    {
        if (tb.value == "")
        {
            tb.value = sb;
        }
    }
    else
    {
        if (tb.value == sb)
        {
            tb.value = "";
        }
    }
}
function change_alias(alias)
{
	var str = alias;
	str= str.toLowerCase(); 
	str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ  |ặ|ẳ|ẵ/g,"a"); 
	str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
	str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
	str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ  |ợ|ở|ỡ/g,"o"); 
	str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
	str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
	str= str.replace(/đ/g,"d"); 
	str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-");
	/* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
	str= str.replace(/-+-/g,"-"); //thay thế 2- thành 1-
	str= str.replace(/^\-+|\-+$/g,""); 
	//cắt bỏ ký tự - ở đầu và cuối chuỗi 
	return str;
}
function doEnter(evt) {
    // IE					// Netscape/Firefox/Opera
    var key;
    if (evt.keyCode == 13 || evt.which == 13) {
        onSearch(evt);
    }
}
function onSearch(evt) {

    var keyword = document.getElementById("keysim").value;
    location.href = "tim-kiem.html/keyword=" + (keyword) ;
        loadPage(document.location);
}
function doEnter1(evt) {
    // IE					// Netscape/Firefox/Opera
    var key;
    if (evt.keyCode == 13 || evt.which == 13) {
        onSearch1(evt);
    }
}
function onSearch1(evt) {

    var keyword = document.getElementById("keyword1").value;
    location.href = "tim-kiem.html/keyword=" + change_alias(keyword) ;
        loadPage(document.location);
}
$(document).ready(function(e) {
	$('.click_mua').click(function(){
		if(isEmpty($('#dh_hoten').val(), "Xin nhập Họ tên"))
		{
			$('#dh_hoten').focus();
			return false;
		}
		
		if(isEmpty($('#dh_dienthoai').val(), "Xin nhập Số điện thoại"))
		{
			$('#dh_dienthoai').focus();
			return false;
		}
		if(isPhone($('#dh_dienthoai').val(), "Xin nhập Số điện thoại"))
		{
			$('#dh_dienthoai').focus();
			return false;
		}
		/* if(isEmpty($('#dh_email').val(), "Email không hợp lệ"))
		{
			$('#dh_email').focus();
			return false;
		} 
		if(isEmail($('#dh_email').val(), "Email không hợp lệ"))
		{
			$('#dh_email').focus();
			return false;
		}*/
		if(isEmpty($('#dh_diachi').val(), "Xin nhập Địa chỉ"))
		{
			$('#dh_diachi').focus();
			return false;
		}
		if(isEmpty($('#captcha').val(), "Xin nhập mã xác nhận"))
		{
			$('#captcha').focus();
			return false;
		}
		document.form_buy_form.submit();
	});
	$('.click_ajax').click(function(){
		if(isEmpty($('#ten_lienhe').val(), "Xin nhập Họ tên"))
		{
			$('#ten_lienhe').focus();
			return false;
		}
		if(isEmpty($('#diachi_lienhe').val(), "Xin nhập Địa chỉ"))
		{
			$('#diachi_lienhe').focus();
			return false;
		}
		if(isEmpty($('#dienthoai_lienhe').val(), "Xin nhập Số điện thoại"))
		{
			$('#dienthoai_lienhe').focus();
			return false;
		}
		if(isPhone($('#dienthoai_lienhe').val(), "Xin nhập Số điện thoại"))
		{
			$('#dienthoai_lienhe').focus();
			return false;
		}
		if(isEmpty($('#email_lienhe').val(), "Email không hợp lệ"))
		{
			$('#email_lienhe').focus();
			return false;
		}
		if(isEmail($('#email_lienhe').val(), "Email không hợp lệ"))
		{
			$('#email_lienhe').focus();
			return false;
		}
		if(isEmpty($('#tieude_lienhe').val(), "Xin nhập Chủ đề"))
		{
			$('#tieude_lienhe').focus();
			return false;
		}
		if(isEmpty($('#noidung_lienhe').val(), "Xin nhập Nội dung"))
		{
			$('#noidung_lienhe').focus();
			return false;
		}
		if(isEmpty($('#capcha').val(), "Nhập mã bảo về"))
		{
			$('#capcha').focus();
			return false;
		}
		document.frm.submit();
	});  
	$("#reset_capcha").click(function() {
		$("#hinh_captcha").attr("src", "sources/captcha.php?"+Math.random());
		return false;
	});
	$(".filter .title").click(function(){
		$root=$(this).parents(".item");
		$root.find("ul").slideDown();
	})
	$(".filter .close").click(function(){
		$root=$(this).parents(".item");
		$root.find("ul").slideUp();
	})
	$(".filter ul li").click(function(){
		$(this).parents("ul").find("li").removeClass("active");
		$(this).addClass("active");
		$url=$("#url_filter").val();
		$mang=$("#filter_mang").find("li.active").data("val");
		$price=$("#filter_price").find("li.active").data("val");
		$sort=$("#filter_sort").find("li.active").data("val");
		if($mang==undefined){ $mang="all"};
		if($price==undefined){ $price=0};
		if($sort==undefined){ $sort=0};
		$url+="&filter="+$mang+"&price="+$price+"&sort="+$sort;
		location.href=$url;
	})
	$(".clear_filter").click(function(){
		$url=$("#url_filter").val();
		location.href=$url;
	})
	$(".menu .close").click(function(){
		$(".menu").removeClass("active");
	})
	$(".click_menu").click(function(){
		$(".menu").addClass("active");
	})
});