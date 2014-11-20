<script id="general-script" type="text/javascript">
    if (styleWhite) { document.body.className = 'white'; }
    //Moved this to lines to begin of body script because of preven showing black style on white
    //var styleWhite = (window.location.href.toLowerCase().indexOf('?style=white') > -1 || window.location.href.toLowerCase().indexOf('&style=white') > -1);
    //if (getCookie('style') != null && getCookie('style').toLowerCase().indexOf('white') > -1) { styleWhite = true; }
    if (getURLParameter('loginError') && getURLParameter('loginError') != 'null') { location.hash = '#login'; }
    if (getURLParameter('oftc') && getURLParameter('oftc') != 'null') { //oftc handle
        [].forEach.call(document.querySelectorAll('.languagesList option'), function (opt, ind) {
            opt.value = opt.value + '&oftc=' + getURLParameter('oftc');
        });
        [].forEach.call(document.querySelectorAll('.header a'), function (lnk, ind) {
            lnk.href = lnk.href + '&oftc=' + getURLParameter('oftc');
        });
        [].forEach.call(document.querySelectorAll('.visitFullSite'), function (lnk, ind) {
            lnk.href = lnk.href + '&oftc=' + getURLParameter('oftc');
        });
    }
    //var paramPrefix = window.location.href.toLowerCase().indexOf('?') > -1 ? '&' : '?';

    if (styleWhite) { // WHite handler
        //disbale scroller X on white app 
        var scrolledTouchedLeft;
        $.each([$(window), $(document), $(document.body)], function() {
            $(this).bind('scroll.whiteApp', function (ev) {
                scrolledTouchedLeft = $(this).scrollLeft();
                if (scrolledTouchedLeft != 0) { $(this).scrollLeft(0); ev.preventDefault(); }
            });
            $(this).bind('touchmove', function (ev) {
                scrolledTouchedLeft = ev.touches[0].clientX || $(this).scrollLeft();
                if (scrolledTouchedLeft != 0) { $(this).scrollLeft(0); ev.preventDefault(); }
            });
        });
        document.body.className = (navigator.userAgent.toLowerCase().indexOf('ipad') > -1) ? 'white ipad' : 'white';
        //We redirect to browser regular homepage from interceptor ios app oftc num of interceptor param ---> oftc=35965 //TODO
            [].forEach.call(document.querySelectorAll('.header a'), function (lnk, ind) {
                //Not redirect to browser from the app
                lnk.href = '#';
            });
            $(document).css('overflow-x', 'hidden');
            $('html').css('overflow-x', 'hidden');
   
        var form = document.getElementById('mobileForm');
        form.action = form.action + '?style=white'; 
        [].forEach.call(document.querySelectorAll('.languagesList option'), function (opt, ind) {
            opt.value = opt.value + '&style=white';
        });
    }

    var showLoader = function() {
        document.getElementById('loader').style.display = 'block';
    }
    var hideLoader = function() {
        document.getElementById('loader').style.display = 'none';
    }
    $('.pre-main-banner').css('display', '');
    $('.main-banner > span.border-img').css('display', 'none');
    showLoader();

        //initiates the form
        (function () {
            var btn2Show = document.getElementById('openAccountScriptBtn');
            if (btn2Show) { // if is noscript mode --> show regular openAccount button
                btn2Show.display = 'block';
                btn2Show.id = '';
            }
            var form = document.getElementById('mobileForm');
            form.style.display = 'block';
            form.onsubmit = function () {
                return validateForm(form);
            };
            if (form !== null) {
                var inputs = form.getElementsByTagName('input');
                if (!('placeholder' in document.createElement("input"))) { // otherwise supports placeholder  --> http://caniuse.com/#search=placeholder
                    for (var i = 0; i < inputs.length; i++) {
                        var input = inputs[i];
                        if (input.type === 'text') {
                            if (this.name == 'username') { this.value = 'Nombre de usuario'; this.defaultValue = 'Nombre de usuario'; }
                            else if (this.name == 'userpass') { this.value = 'Contrase&#241;a'; this.defaultValue = 'Contrase&#241;a'; }                            
                            input.onfocus = function () {
                                if (this.value == this.defaultValue) {
                                    this.value = '';
                                    if (this.name == 'userpass') {
                                        this.type = 'password';
                                    }
                                }
                            };
                            input.onblur = function () {
                                if (this.value == '') {
                                    this.value = this.defaultValue;
                                    if (this.name == 'username') {
                                        this.value = "Nombre de usuario";
                                        this.type = 'text';
                                    }
                                }
                            };
                        }
                    }
                }
                else {//supports placeholder --> make type password and no need for value
                    for (var i = 0; i < inputs.length; i++) {
                        if (inputs[i].type === 'text') {
                            if (inputs[i].name == 'userpass') {
                                inputs[i].type = 'password';
                                break;
                            }
                        }
                    }
                }
            }
        })();


        function validateForm(thisForm) {
            var valid = true;
            var elementsInputs = thisForm.getElementsByTagName("input");

            for (var intCounter = 0; intCounter < elementsInputs.length; intCounter++) {
                var field = elementsInputs[intCounter];
                if (field.type == "text" || field.type == "password") {
                    if (!validateRequired(field)) {
                        valid = false;
                        field.className = field.className.replace(/\berror\b/, '');
                        field.className += " error";
                    } else {
                        field.className = field.className.replace(/\berror\b/, '');
                    }
                }
            }
            //$(thisForm).validate();
            //valid = $(thisForm).valid();
            return valid;
        }

        function validateRequired(field) {
            if (field.value === null || field.value === "" || field.value === field.defaultValue) {
                return false;
            } else {
                return true;
            }
        }
        window.onload = chackqQueryString;
        function chackqQueryString() {
            if (location.search.indexOf("loginError") !== -1) {
                //console.log('found!');
                err_msg = '<div class="errorMessage">Connection failure. Please re enter username and password.</div>';
                $(".form_btn").after(err_msg);
            }
            else $('.errorMessage').remove();
        }

        var videoError = function (vid) {
            console.log('was error playing video' + vid);
            removeVideoImgInstead(vid);
        }
        var removeVideoImgInstead = function (vid) {
            //totally disable and remove video tag
            $('video').remove();
            vid = null;
            //paste the image src to the image
            $('.instead-video img').attr('src', 'https://cdn.pas-rahav.com/24option/mobile/posters/ES-24option-main-banner-695x395.jpg');
            //show the image - is hidden by default
                $('.instead-video').show();
        }

    $(document).ready(function () {
            var video = document.getElementById('video-sources') || document.getElementsByTagName('video')[0];//2nd is for safari
            if (video && video.canPlayType && !video.canPlayType('video/mp4') && !video.canPlayType('video/webm') && !video.canPlayType('video/ogv')){
                removeVideoImgInstead(video);
                video = null;
            }
            
            if (video) {
                video.onerror = function () {
                    videoError(video);
                }
                if (!$.browser.mozilla) {// for ff it works well as in html for some others need to make mp4 topest
                    var srcesHtm = '<source src="https://cdn.pas-rahav.com/24option/mobile/sp_small_mobile.mp4" type="video/mp4" />' + '<source src="https://cdn.pas-rahav.com/24option/mobile/sp_small_mobile.webm" type="video/webm" />' + '<source src="https://cdn.pas-rahav.com/24option/mobile/sp_small_mobile.ogv" type="video/ogg" />'
                        + '<source src="//cdn.pas-rahav.com/24option/mobile/en_small.mp4.mp4" type="video/mp4" \/>'
                        + '<source src="//cdn.pas-rahav.com/24option/dec12/en_small.mp4" type=' + "'" + 'video/mp4" \/>'
                        + '<a href="https://www.24option.com/?lang=ES&amp;fullsite=false" title="24option - Negociaci&#243;n de Opciones Binarias - Opciones Forex, Opciones de Valores, Opciones de Indices, Opciones de Materias Primas"><img src="https://cdn.pas-rahav.com/24option/mobile/posters/ES-24option-main-banner-695x395.jpg" alt="24option - Negociaci&#243;n de Opciones Binarias - Opciones Forex, Opciones de Valores, Opciones de Indices, Opciones de Materias Primas" title="24option - Negociaci&#243;n de Opciones Binarias - Opciones Forex, Opciones de Valores, Opciones de Indices, Opciones de Materias Primas"\/><\/a>';
                    $(video).html(' ');
                    $(video).html(srcesHtm);
                }
            } else {
                removeVideoImgInstead(video);
                video = null;
            }
            
            var hiddenIds = ['#loginPage', '#introVideo'],
                shownId = '#homePage', //first must be #home bec. if get from hash the hash page isnt really shown yet //location.hash.toLowerCase() || '#homePage';
                down_x = null, up_x = null, down_y = null, up_y = null, mouse_down = false, speed = 300, winW = $(window).width();



            function my_swipe(a, b, c) {
                if (Math.abs(up_y - down_y) <= 75) {// filter y movements
                    if ((down_x - up_x) > 50) {
                        location.hash = (shownId.indexOf('login') < 0) ? '#login' :'#';
                        //my_swipe_left(getHiddenPageToShowId());
                    }
                    else if ((up_x - down_x) > 50) {
                        location.hash = (shownId.indexOf('login') < 0) ? '#login' :'#';
                        //my_swipe_right(getHiddenPageToShowId());
                    }
                }
            }
            function my_swipe_left(hiddenId) {
                $(shownId).animate({ marginLeft:'-3000px' }, speed, function () {
                    $(shownId).css('display', 'none');
                    var tempShown = shownId;
                    shownId = hiddenId;
                    $(hiddenId).css('display', 'block');
                    $(hiddenId).css('margin-left', '3000px');
                    //$(hiddenId).animate({ 'marginLeft':"'" + (0/*winW/2 - 340*/) + "px'" }, function () {
                    $(hiddenId).animate({ 'marginLeft':0 }, speed, function () {
                        hiddenId = tempShown;

                    });
                });
            }
            function my_swipe_right(hiddenId, callback) {
                $(shownId).animate({ 'marginLeft':'3000px' }, speed, function () {
                    $(shownId).css('display', 'none');
                    var tempShown = shownId;
                    shownId = hiddenId;
                    $(hiddenId).css('display', 'block');
                    $(hiddenId).css('margin-left', '-3000px');
                    $(hiddenId).animate({ 'marginLeft':0 }, speed, function () {
                        hiddenId = tempShown;
                        if (typeof (callback) != typeof (undefined)) {
                            callback();
                        }
                    });
                });
            }
            jQuery.fn.center = function () {
                this.css("position", "absolute");
                var left = ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + "px";
                this.animate({ left:left }, 'fast', function () {
                    $(this).css({ position:'static', margin:'0 auto' });
                });
                return this;
            }

            function register_swipe(div, callback) {
                div.bind('mousedown', (function (e) {
                    if (!$(e.target).is('input') && !$(e.target).is('button') && !$(e.target).hasClass('gwt-ListBox') && !$(e.target).is('a')) {
                        e.preventDefault();
                        down_x = e.pageX;
                        up_x = e.pageX;
                        down_y = e.pageY;
                        up_y = e.pageY;
                        mouse_down = true;
                        $("body").unbind();
                        $("body").mousemove(function (e) {
                            if (mouse_down) {
                                var diff = e.pageX - up_x;
                                var left = parseInt(div.css('left').replace('px', ''));
                                div.css('left', left + diff);
                                up_x = e.pageX;
                                up_y = e.pageY;
                            }
                        });
                        $("body").mouseup(function (e) {
                            up_x = e.pageX;
                            up_y = e.pageY;
                            callback();
                            $(this).unbind();
                            mouse_down = false;
                        });
                    }
                }));
                div.bind('touchstart', function (e) {
                    down_x = e.originalEvent.touches[0].pageX;
                    up_x = down_x;
                    down_y = e.originalEvent.touches[0].pageY;
                    up_y = down_y;
                    $("body").unbind('touchmove touchend');
                    $("body").bind('touchmove', function (e) {
                        //e.preventDefault();
                        var diff = e.originalEvent.touches[0].pageX - up_x;
                        var left = parseInt(div.css('left').replace('px', ''));
                        if (!left)
                            left = 0;
                        div.css('left', left + diff);
                        up_x = e.originalEvent.touches[0].pageX;
                        up_y = e.originalEvent.touches[0].pageY;
                    });
                    $("body").bind('touchend', function (e) {
                        callback();
                        $(this).unbind();
                    });
                });
            }

            //js navigation between areas handler
            var hash = location.hash.toLowerCase(),
                hashBack = hash.toLowerCase();

            setInterval(function () {
                if (location.hash.toLowerCase() != hash) {
                    showLoader();
                    hashBack = hash.toLowerCase();
                    hash = location.hash.toLowerCase();
                    if (hash.indexOf('login') > -1) {
                        openInnerLoginPage();                    
                    } else if (hash.indexOf('video') > -1) {
                        openInnerVideoPage();              
                    } else { //if(hash === '' || hash === '#') {                        
                        openInnerHomePage();                       
                    }
                } else {
                    hideLoader();
                }
            }, 500);
        
            //onLoad
            if (hash.indexOf('login') > -1) { openInnerLoginPage(); } else if (hash.indexOf('video') > -1) { openInnerVideoPage(); }

            function openInnerLoginPage() {
                $('#homePage, #introVideo').hide();
                if(video) video.pause();
                my_swipe_left('#loginPage');//getHiddenPageToShowId());
                //$('.navigationPanel').show();
                shownId = "#loginPage";
                //$(document.body).css('background', '#212227');
            }



// ---------------------------------------------------------------------------------------------
// Overwrite buttons behavior, change logic of program from reading hash to onclick
// ---------------------------------------------------------------------------------------------

$(".loginButtonBlock .education-banner a").click(function(event) {

                   event.preventDefault();
                    showLoader();
                    openInnerLoginPage();
});



$(".navigationPanel a").click(function(event) {

        event.preventDefault();
            showLoader();
            openInnerHomePage();
});


// ---------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------





            function openInnerVideoPage() {
                $('#homePage, #loginPage').hide();//function () {
                //setVideoSize();
                //$(document.body).css('background', '#000');
                
                my_swipe_right('#introVideo', setVideoSize);

                shownId = "#introVideo";
                if (video) {
                    $(video).attr('preload', 'metadata');
                    video.volume = 0.6;
                }
                if (video && video.currentTime && video.currentTime > 0) {//played allready
                    if (video.duration && (video.currentTime < video.duration)) video.play();
                    else video.currentTime = 0;
                }
                setVideoSize();
            };

                function setVideoSize() {
                    if (video) {
                        $('#24optionVideo').css('width', (getViewport()[0]));// * 10) / 100);//$('#introVideo').outerWidth());//$('#introVideo').width());
                        $('#24optionVideo').css('max-height', getViewport()[1] - 41/*$('.header').height()*/ - 41/*$('.navigationPanel').height() - 10*/);//$(window).height() - $('.header').height() - $('.navigationPanel').height());
                        $('video').attr('width', getViewport()[0]);// - (getViewport()[0] * 10)/100 );
                        //$('#24optionVideo').css('margin-top', '5px');
                    } else {
                        $('.instead-video').css('display', ' ');
                        $('.instead-video img').css('width', (getViewport()[0]));// * 10) / 100);//$('#introVideo').outerWidth());//$('#introVideo').width());
                        //$('.instead-video img').css('height', $(window).height() - 30);
                        //$('.instead-video img').css('margin', '5px auto');
                    }
                }

                window.onresize = setVideoSize;
           
            function openInnerHomePage() {
                $('#loginPage, #introVideo').hide();
                my_swipe_right('#homePage');
                if(video) video.pause();
                shownId = "#homePage";
                //$(document.body).css('background', '#212227');
            }

  // end of  navigation between areas handler
            $('.pre-main-banner').css('display', 'none');
            $('.main-banner > span').css('display', '');
            $('.main-banner').css('height', '176');//if the main banner text was 1 line more like in español lang
            function capitaliseFirstLetter(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            }
                function getViewport() {
                    var viewPortWidth, viewPortHeight;
                    if (typeof window.innerWidth != 'undefined') {// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
                        viewPortWidth = window.innerWidth; viewPortHeight = window.innerHeight;
                    }
                    else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
                        viewPortWidth = document.documentElement.clientWidth; viewPortHeight = document.documentElement.clientHeight;
                    }
                    else {// older versions of IE
                        viewPortWidth = document.getElementsByTagName('body')[0].clientWidth; viewPortHeight = document.getElementsByTagName('body')[0].clientHeight;
                    }
                    return [viewPortWidth, viewPortHeight];
                }
        });
    </script><script type="text/javascript" id="validation-configuration">
    var minCharsUsr = 3, minCharsPass = 5, maxChars = 15;
        window.messages = {
            username: {
                required: 'Please type a User Name',
                not_text_tip: 'Please type a User Name',
                maxlength: 'Max. 15 character User Name',
                minlength: 'Min. 3 character User Name',
            },
            userpass: {
                required: 'Please type a Password',
                not_text_tip: 'Please type a Password',
                maxlength: 'Max. 15 character Password',
                minlength: 'Min. 5 character Password'
            }
        };

        $(function () {
            init_swap_text_boxes();
            if ($('form#mobileForm input[name*="terms"]').length != 0) {
                var terms_required = true;
            } else {
                var terms_required = false;
            }
            $.validator.addMethod('not_text_tip', not_text_tip, "This field is required.");
            $.validator.addMethod('alpha', alpha, "Can not consist of numerical characters only.");
            $.validator.addMethod('accEmail', accEmail, "Enter a valid email address.");


            $("form#mobileForm").validate({
                focusInvalid: false,
                onkeyup: false,
                focusCleanup: true,
                rules: {
                    username: { required: true, alpha: true, not_text_tip: true, minlength: minCharsUsr, maxlength: maxChars },
                    userpass: { required: true, alpha: false, not_text_tip: true, minlength: minCharsPass, maxlength: maxChars }
                },
                messages: messages,

                unhighlight: function (element, errorClass, validClass) {
                    $(element).removeClass(errorClass).addClass(validClass);
                    $('a[href=#' + $(element).parents('.ui-tabs-panel').attr('id') + ']').removeClass(errorClass).addClass(validClass);
                },
                showErrors: function (errorMap, errorList) {;
                    var summary = ""; //"You have the following errors: \n";
                    $.each(errorMap, function (key, value) {
                        summary += " *  " + value + "<br />";
                    });
                    if (errorList.length > 0) {
                        $('.formErrors span').html(summary.slice(0, -("<br />".length)));
                        $('.formErrors').show().focus();
                    }
                    else {
                        $('.formErrors span').html('');
                        $('.formErrors').hide();
                    }
                    //this.defaultShowErrors();
                },
                invalidHandler: function (form, validator) {
                    //$('.formErrors').text('');
                    //$('.formErrors').toggle();
                    //submitted = true;
                },
                submitHandler: function (form) {
                    // some other code
                    // maybe disabling submit button
                    // then:
                    _trackEvent(category, action);

                    $(form).submit();
                }
            });
        });

        function alpha(value, element) {
            return this.optional(element) || /[a-zA-Z一-龠ぁ-ゔァ-ヴーａ-ｚＡ-Ｚ０-９々〆〤АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя \u4E00-\u9FFF\xE0-\xFA\u0591-\u05F4\xC1-\xEA\u0600-\u06FF]+/.test(value);
        }

        function accEmail(value, element) {
            return this.optional(element) || /([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])/.test(value);
        }
        function not_text_tip(value, element) {
            var text_tip = $(element).data('text_tip');

            if (text_tip != value) return true;
        }

        function init_swap_text_boxes() {
            var $event_origin, text_tip, this_val;

            _store_value();

            $('input[type=text]').bind('focus._do_swap blur._do_swap', _do_swap);

            function _store_value() {
                $('input[type=text]').each(function (i) {
                    text_tip = $(this).attr('value');
                    $(this).data('text_tip', text_tip);
                });
            }

            function _do_swap(event) {
                $event_origin = $(event.target);
                this_val = $event_origin.val();
                text_tip = $event_origin.data('text_tip');

                if (event.type == 'focus' && _this_is_a_text_tip()) _clear_input_color_black();
                if (event.type == 'blur' && _this_input_is_empty()) _restore_text_tip_and_color();
            }

            function _clear_input_color_black() {
                $event_origin
                    .val('')
                    .css({ color: '#000' });
            }

            function _this_is_a_text_tip() {
                if (this_val == text_tip) return true;
            }

            function _this_input_is_empty() {
                if (!$event_origin.val()) return true;
            }

            function _restore_text_tip_and_color() {
                $event_origin
                    .val(text_tip)
                    .removeAttr('style');
            }
        }
    </script>
<!--script src="https://jwpsrv.com/library/_vlRom8TEeSSMAoORWfmyA.js"></script-->
<!--script type='text/javascript'>
    jwplayer('playerYwlZrYsa').setup({
        playlist: '//content.jwplatform.com/feed/YwlZrYsa.rss',
        width:'320px',
        height:'180px',
        aspectratio: '16:9',
        mute: 'true'
    });
</script-->
