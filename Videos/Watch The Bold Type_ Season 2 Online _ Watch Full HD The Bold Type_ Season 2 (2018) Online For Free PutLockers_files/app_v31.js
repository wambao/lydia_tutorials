
var wow = new WOW(
        {
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 0, // distance to the element when triggering the animation (default is 0)
            mobile: true, // trigger animations on mobile devices (default is true)
            live: true        // act on asynchronously loaded content (default is true)
        }
);
wow.init();

$(document).ready(function () {

    if( navigator.userAgent.match(/Android/i)
     || navigator.userAgent.match(/webOS/i)
     || navigator.userAgent.match(/iPhone/i)
     || navigator.userAgent.match(/iPad/i)
     || navigator.userAgent.match(/iPod/i)
     || navigator.userAgent.match(/BlackBerry/i)
     || navigator.userAgent.match(/Windows Phone/i)
     )
    {
        var android = location.href.match(/#android$/) || navigator.userAgent.match(/Android/i) != null;
        if(android){
            
        } else{
            
        }
    }  

    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('#back_to_top').removeClass().addClass('animated fadeInRight').show();
        } else {
            $('#back_to_top').removeClass().addClass('animated fadeOutRight').show();
        }
    });

    // scroll body to 0px on click
    $('#back_to_top').click(function () {
        
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    $('#back_to_top').hide();

    $(".scroll-button-event li").click(function(e){
        e.preventDefault();
        var param1 = $(this).attr('rel');
        var param2 = $(this).text();
        
        $(this).closest('.scroll-button-event').prev().attr('rel', param1);
        $(this).closest('.scroll-button-event').prev().html(param2);
		
		showSchedule();
    });

    $(".scroll-button-event-card li").click(function(e){
        e.preventDefault();
        var param1 = $(this).attr('rel');
        var param2 = $(this).text();
        
        $(this).closest('.scroll-button-event-card').prev().attr('rel', param1);
        $(this).closest('.scroll-button-event-card').prev().html(param2);
    });
    
    $(".scroll-button-event-tv li").click(function(e){
        e.preventDefault();
        var param1 = $(this).attr('rel');
        var param2 = $(this).text();
		var class_p = $(this).closest("li").find("p").first().attr('class').replace('mar-p ', '');
		
        var arrow_down = '<span class="caret-list"></span>';
		var span_p = '<span class=" ' + class_p + ' "> ';
        $(this).closest('.scroll-button-event-tv').prev().attr('rel', param1 + arrow_down);
        $(this).closest('.scroll-button-event-tv').prev().html(span_p + param2 + '</span>' + arrow_down);
		
		showSchedule();
    });

    $(".scroll-button-event").mCustomScrollbar({
        //                  setTop:"540px"
        theme: "s-event",
        mouseWheel:{ preventDefault: true },
    });
    $(".scroll-button-event-tv").mCustomScrollbar({
        //                  setTop:"540px"
        theme: "s-event",
        mouseWheel:{ preventDefault: true },
    });
    $(".scroll-button-event-schedule").mCustomScrollbar({
        //                  setTop:"540px"
        theme: "s-event",
        mouseWheel:{ preventDefault: true },
    });
	
    /*$("#loadmore_block").delegate("#btn_showschedule", "click", function(){
        $("#schedule_ul").toggleClass("more");
    });*/
    
    var sliderBanner = $('.slide_banner').bxSlider({
        auto: true,
        prevText: w >= 768 ? '<img class="img-reponsive" src="'+ host_static + 'themes/movies/img/icon/icon_left.png" alt=""/>' : '<img src="'+ host_static + 'themes/movies/img/icon/icon_left.png" alt=""/>',
        nextText: w >= 768 ? '<img class="img-reponsive" src="'+ host_static + 'themes/movies/img/icon/icon_right.png" alt=""/>' : '<img src="'+ host_static + 'themes/movies/img/icon/icon_right.png" alt=""/>',
        pagerCustom: '#bx-pager',
        pause: 5000,
        onSliderLoad: function(){
            $('#page-loading-overlay').removeClass('page-loading');
        }
    });
    if($(window).width() < 700){
        $("#bx-pager").hide();
    }
    var myVar;
    $('#bx-pager a').hover(function(){
        var index = $(this).attr('data-slide-index');
        clearTimeout(myVar);
        myVar = setTimeout(function () {
            sliderBanner.goToSlide(index);
        }, 1000);
    }, function(){

    });

    var w = $(document).width();
    $(".slider").each(function(i, item){  
        var min = 6;
        if(w > 1366){
            min = 7;
        }

        $('#' + $(item).attr('id') +' .item_slider').slider({
            minSlides: min,
            indicator: $('#' + $(item).attr('id') +' .list-inline'),
            prevText: '<a class="col-xs-0 col-sm-1 bx-controls-direction bx-next" rel="next" href="javascript:void(0)"><img class="img-reponsive" src="'+ host_static + 'themes/movies/img/icon/icon_right.png" alt=""/></a>',
            nextText: '<a class="col-xs-0 col-sm-1 bx-controls-direction bx-prev" rel="prev" href="javascript:void(0)"><img class="img-reponsive" src="'+ host_static + 'themes/movies/img/icon/icon_left.png" alt=""/></a>',
        });           
    });

    /*$('.slide_simple').slider({
        minSlides: 5,
        prevText: '<div class="col-sm-1 col-lg-1 pull-left"><a href="#" class="danet_navbar_deactive bx-next"><img class="img-reponsive" src="'+ host_static + 'themes/movies/img/icon/navback.png" alt=""/></a></div>',
        nextText: '<div class="col-sm-1 col-lg-1"> <a href="#" class="pull-right bx-prev"><img class="img-reponsive" src="'+ host_static + 'themes/movies/img/icon/navnext.png" alt=""/></a></div>',
    });*/  

    /* Slider Dannet */   
    if($('.slide_simple').html != ''){
        var obj = $('.slide_simple');
        var length = $('.slide_simple li').length;
        var w_length = $('.slide_simple li').outerWidth(true);
        var w = $(document).width();
        var padding = 200;
        var margin = 4;
        var w_doc = w - (padding * 2);
        var w_li = w_doc / 5;
        var maxpage = length - 5;
        var page = 0;
        obj.find('.slide').width(w_doc);
        obj.find('.slide li').width(w_li);
        obj.find('.slide ul').width(length * w_li);
		if(obj.find('li').length > 5)
		{	
			/*obj.find('li').each(function(i, item){
				if($(item).hasClass('active')){
					var index = i + 1;
					if(index > 5){
						var index_next = index - 5;
						page = index - 5;
						console.log(page);
						if(page == maxpage){
							obj.find('.next').addClass('danet_navbar_deactive');
							obj.find('.prev').removeClass('danet_navbar_deactive');                    
						}
						obj.find('ul').css('margin-left', -Math.abs(index_next*w_li));
					}
				}
			});*/

			obj.find('li').click(function(){
				obj.find('li').removeClass('active');
				$(this).addClass('active');
			});
			
			obj.find('.next').click(function(){
				if(page < maxpage){
					page = page + 1;
					obj.attr('click', page);
					$('.slide_simple .slide ul').animate({
						"margin-left": "-=" + w_li,
					}, 500, function() {
						// Animation complete.
					});
					if(page == maxpage){
						obj.find('.next').addClass('danet_navbar_deactive');
					}
					obj.find('.prev').removeClass('danet_navbar_deactive');
				}
			});
			obj.find('.prev').click(function(){
				if(page > 0){
					page = page - 1;
					obj.attr('click', page);
					$('.slide_simple .slide ul').animate({
						"margin-left": "+=" + w_li,
					}, 500, function() {
						// Animation complete.
					});
					if(page == 0){
						obj.find('.prev').addClass('danet_navbar_deactive');
					}
					obj.find('.next').removeClass('danet_navbar_deactive');
				}       
			}); 
		}
		else
		{
			obj.find('.next').remove();
			obj.find('.prev').remove();
		}
    }

    $("img.lazy").lazyload();
	
	$("#search_favorite").keyup(function(e){
			$('.filter').removeClass('show');
			var pattern = $("#search_favorite").val();
			var check = 0;
			if(pattern == ''){
				$('.filter').show();
				$('.filter').removeClass('show');
				$('.load-more-link').show();
				return false;
			}
			
			$('.filter').each(function(i, item){
				var str = $(item).attr('title');
				if (str.match(pattern)) {
					check = 1;
					$(item).addClass('show');
				}
			});
					count = $(".show").length;
			if(check == 1){
				$('.filter').hide();
				$('.filter.show').fadeIn();
			}
			if($(".show").length < 30)
			{
				$('.load-more-link').hide();
			}
			else
			{
				$('.load-more-link').show();
			}
    });

    $("#frmLogin").keypress(function(e){
        if(e.keyCode == 13){
            doLogin();
        }
    });

    var search_w = $("#search_keyword").outerWidth();
    $("#search_keyword").autocompletesearch({
        width: 400,
        method: "POST",
        url: host + "/tim-kiem/auto",
        maxheight: 428,
        data: "page=search_auto"
    });
    
    
    $('.topmenu_list_item').click(function(){
        $this = $(this).find('ul');
        $this.css('max-height', '');
        $this.css('transition', '');
    });

    $('.topmenu_list_item').blur(function(){
        $this = $(this).find('ul');
        $this.css('max-height', '100px');
        $this.css('transition', 'all 0.5s');
    });
    
    /*$('.topmenu_list_item').hover(function( event ) {
        if(event.type === 'mouseenter')  { 
            $("#sub_more").show();
            $("#sub_more").css('max-height', '');
            $("#sub_more").css('transition', '');
        } else if(event.type === 'mouseleave'){
            $("#sub_more").hide();
            $("#sub_more").css('max-height', '100px');
            $("#sub_more").css('transition', 'all 0.5s');
        }
    });*/
    
    $('.topmenu_list_item').hover(function() {
        clearTimeout($(this).data('timeout'));
        $(this).find('ul').show();
        $(this).find('ul').css('max-height', '');
        $(this).find('ul').css('transition', '');
		$(this).find('ul').css('min-width', '100%');
    }, function() {
        var self = $(this).find('ul');
        var t = setTimeout(function() {
            self.hide();
            self.css('max-height', '100px');
            self.css('min-width', '100%');
            self.css('transition', 'all 0.5s');
        }, 400);
        $(this).data('timeout', t);
    });

    $('a.sort_post').click(function (event) {
        event.preventDefault();
        $('.title-dropdown').html($(this).html());
        $('.title-dropdown').attr('val', $(this).attr('val'));
    });

    $('a.sort_post_amount').click(function (event) {
        event.preventDefault();
        $('.title-dropdown-amount').html($(this).html());
        $('.title-dropdown-amount').attr('val', $(this).attr('val'));
    });

    $('#modal_box').on('hidden.bs.modal', function () {
        var html = '<div class="header_popup"><span>Loading...</span></div><div class="content_popup"><div class="text_content_popup" id="details_channel"><div class="row" style="text-align: center">';                       
            html += '<img id="loading_img_giftcode" src="'+ host_static + 'themes/movies/img/icon/loading.gif" />';
            html += '                    </div>';
            html += '                </div>';
            html += '           </form>';
            html += '        </div>';
        $('#modal_box .popup_dialog').html(html);
        $('#modal_box .popup_dialog').removeAttr('id');
    });

    $("#selectChannel").click(function(){
        $('html, body').animate({
            scrollTop: ($(".first_group").offset().top - 60)
        }, 2000);
    });

    $("#light").click(function(){
        if($("#light").hasClass("turnon-light")){
            $("#page-loading-overlay").addClass("page-shadow");
            $(".turnon-light").addClass("turnoff-light");
            $(".turnoff-light").removeClass("turnon-light");
            $("#top").css('z-index', '1000');
            $("#wrap_top_menu").css('visibility', 'hidden');
            $(".banner_view").css('background-color', '#000');
            $("#ic_Light").attr("src", host_static + "themes/movies/img/icon/ic_Light_off.png");
        } else{
            $("#page-loading-overlay").removeClass("page-shadow");
            $(".turnoff-light").addClass("turnon-light");
            $(".turnon-light").removeClass("turnoff-light");
            $("#top").css('z-index', '2');
            $("#wrap_top_menu").css('visibility', 'visible');
            $(".banner_view").css('background-color', '#3e3e3e');
            $("#ic_Light").attr("src", host_static + "themes/movies/img/icon/ic_Light.png");
        }        
    });     
    if (localStorage.user_code && localStorage.user_code != undefined) {
        $("#user_code").val(localStorage.getItem("user_code"));
    }
	
	setTimeout(function() {
		$(".ads_mid_banner .ants-zone").css("width", "100%");
		$(".ads_mid_banner .ants-zone img").css("width", "100%");
		$(".ads_bot_banner .ants-zone").css("width", "100%");
		$(".ads_bot_banner .ants-zone img").css("width", "100%");
	}, 3000);

    if($("#events").html() != ''){
        var e_d_w = $(document).width();
        $('.event_copa').width(e_d_w - (102*2));

        var e_w = $('.event_copa').outerWidth();
        var e_length = $('.event_copa').length;
        var parent_w = e_w * e_length;
        $(".event_div").width(parent_w);

        var obj = $('#events');
        var page = parseInt(obj.attr('page'));
        var maxpage = e_length;   

        obj.find('.next').click(function(){
            page = parseInt(obj.attr('page'));
            if(page < maxpage){
                page = page + 1;
                obj.attr('page', page);
                $('.event_div').animate({
                    "margin-left": "-=" + e_w,
                }, 500, function() {
                    // Animation complete.
                });
                if(page == maxpage){
                    obj.find('.next').hide();
                }
                obj.find('.prev').show();
            }
        });
        obj.find('.prev').click(function(){
            page = parseInt(obj.attr('page'));
            if(page > 0){
                page = page - 1;
                obj.attr('page', page);
                $('.event_div').animate({
                    "margin-left": "+=" + e_w,
                }, 500, function() {
                    // Animation complete.
                });
                if(page == 1){
                    obj.find('.prev').hide();
                }
                obj.find('.next').show();
            }       
        }); 
    }
    
    $("#frm_qnet").submit(function(){
        var name = $("#qnet_name").val(); 
        var phone = $("#qnet_phone").val(); 
        var email = $("#qnet_email").val();
        var password = $("#qnet_password").val(); 
        var password_repeat = $("#qnet_password_repeat").val();
        var payment_provider =  $("#payment_provider").val();

        //var ChkFrmRegisterPopup = $("input[name=checkreg]:checked").val();

        if(name == '' || phone == '' || password == '' || password_repeat == '' || payment_provider == ''){
            $('#modal_reg_qnet .alert').addClass('alert-danger');
            $('#modal_reg_qnet .alert').show();
            $("#modal_reg_qnet .alert").html("Please insert full infomation");
            setTimeout(function () {
                $("#modal_reg_qnet .alert p").html('');
                $('#modal_reg_qnet .alert').hide();
            }, 3000);
            return false;
        } else{

            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!re.test(email)){
                $('#modal_reg_qnet .alert').addClass('alert-danger');
                $('#modal_reg_qnet .alert').show();
                $("#modal_reg_qnet .alert").html("Wrong Email.");
                setTimeout(function () {                        
                    $("#modal_reg_qnet .alert").html('');
                    $('#modal_reg_qnet .alert').hide();
                }, 3000); 
                return false;
            }

            if(password !== password_repeat){
                $('#modal_reg_qnet .alert').addClass('alert-danger');
                $('#modal_reg_qnet .alert').show();
                $("#modal_reg_qnet .alert").html("Wrong Email.");
                setTimeout(function () {                        
                    $("#modal_reg_qnet .alert").html('');
                    $('#modal_reg_qnet .alert').hide();
                }, 3000); 
                return false;
            }
        }
    });

    $("#showeuro").click(function(){
        if($("#showeuro").hasClass('show')){
            $('.euro_bullet').attr('src', '/euro_themes/movies/img/icon/down.png');
            $("#showeuro").removeClass('show');
            $("#showeuro").addClass('hid');
            $('.euro_menu').hide();

        } else{
            $('.euro_bullet').attr('src', '/euro_themes/movies/img/icon/up.png');
            $("#showeuro").removeClass('hid');
            $("#showeuro").addClass('show');
            $('.euro_menu').show();
        }
    });

});