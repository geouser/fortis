// Global parameters
window.params = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent)
};



for ( var i = 1; i <= 4; i++ ) {
    $('.partners-box').prepend('<div class="partner-item' +' item-' + i + '"></div>');
}
$(window).on('load resize', function(event) {
    event.preventDefault();
    var vh = $(this).height() - 60;
    $('.partner-item').height( vh/5 );

    
    var wv = $(window).width();

    if ( (wv > 950) ) {
        projectWidth = $('.projects-box').width()/4;
    } else if ( (wv <= 950) && (wv > 700 ) ) {
        projectWidth = $('.projects-box').width()/3;
    } else if ( (wv <= 700) && (wv > 500 ) ) {
        projectWidth = $('.projects-box').width()/2;
    } else if ( wv <= 500 ) {
        projectWidth = $('.projects-box').width();
    }

    $('.project-item').width( projectWidth );
    $('.scrollableArea').width( $('.scrollableArea').children().length*projectWidth );
});


jQuery(document).ready(function($) {

    if ( $('.scroll').length > 0 ) {
        $('.scroll').mCustomScrollbar({
            theme: 'minimal-dark',
            axis: 'y'
        });
    }

    $('body').addClass('loaded');   

    setTimeout(function(){
        $('.section--1 .section__title.animated').addClass('magictime spaceInLeft');
    }, 1000);
    setTimeout(function(){
        $('.section--1 .section__text.animated').addClass('magictime spaceInLeft');
    }, 1600);
    setTimeout(function(){
        $('.section--1 .button.animated').addClass('magictime boingInUp');
    }, 2400);

    /*---------------------------
                                  SmoothScroll slider
    ---------------------------*/
    if ($(".projects-slider").length > 0) {

        if (params.isMobile) {
            $(".projects-slider").smoothDivScroll({
                mousewheelScrolling: "",
                manualContinuousScrolling: false,
                autoScrollingMode: "",
                touchScrolling: true,
                mousewheelScrollingStep: 1,
                hotSpotScrolling: false
            });
        } else {
            $(".projects-slider").smoothDivScroll({
                mousewheelScrolling: "",
                manualContinuousScrolling: false,
                autoScrollingMode: "",
                touchScrolling: true,
                mousewheelScrollingStep: 1,
                autoScrollingInterval: 30,
                hotSpotScrollingStep: 5,
                hotSpotMouseDownSpeedBooster: 10,
                easingAfterHotSpotScrolling: true
            });
        }
        
    };

    /*---------------------------
                                  Fullpage
    ---------------------------*/

   if ( $('#fullpage').length > 0 ) {

        var interval;
        var timer = function(){
            interval = setInterval(function(){
               $.fn.fullpage.moveSectionDown(); 
            },6000);
        };

        $('#fullpage').fullpage({
            //Navigation
            menu: '#menu',
            lockAnchors: true,
            anchors:['1', '2', '3', '4'],
            navigation: true,
            navigationPosition: 'left',
            navigationTooltips: [],
            showActiveTooltip: false,
            slidesNavigation: false,
            slidesNavPosition: 'bottom',

            //Scrolling
            css3: true,
            scrollingSpeed: 700,
            autoScrolling: true,
            fitToSection: true,
            fitToSectionDelay: 1000,
            scrollBar: false,
            easing: 'easeInOutCubic',
            easingcss3: 'ease',
            loopBottom: false,
            loopTop: false,
            loopHorizontal: true,
            continuousVertical: false,
            continuousHorizontal: false,
            scrollHorizontally: false,
            interlockedSlides: false,
            resetSliders: false,
            fadingEffect: false,
            normalScrollElements: '',
            scrollOverflow: false,
            scrollOverflowOptions: null,
            touchSensitivity: 15,
            normalScrollElementTouchThreshold: 5,
            bigSectionsDestination: null,

            //Accessibility
            keyboardScrolling: true,
            animateAnchor: true,
            recordHistory: true,

            //Design
            controlArrows: true,
            verticalCentered: true,
            sectionsColor : '',
            paddingTop: '100px',
            paddingBottom: '65px',
            fixedElements: '#menu',
            responsiveWidth: 0,
            responsiveHeight: 0,
            responsiveSlides: false,
            loopBottom: true,

            //Custom selectors
            sectionSelector: '.section',
            slideSelector: '.slide',

            //events
            onLeave: function(index, nextIndex, direction){},
            afterLoad: function(anchorLink, index){
                    setTimeout(function(){
                        $('.active .section__title.animated:not(.section--1 .section__title)').addClass('magictime spaceInLeft');
                    }, 100);
                    setTimeout(function(){
                        $('.active .section__text.animated:not(.section--1 .section__text)').addClass('magictime spaceInLeft');
                    }, 500);
                    setTimeout(function(){
                        $('.active .button.animated:not(.section--1 .button)').addClass('magictime boingInUp');
                    }, 1200);
                    $('.active .line').addClass('active');
                    clearInterval(interval);
                    timer();
            },
            afterRender: function(){
            },
            afterResize: function(){},
            afterResponsive: function(isResponsive){},
            afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
            onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
        });    
    }


    /*
        Contacts page
    */
    $('.open-form, .close-form').on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        $('.contacts-info, .contacts-form').toggleClass('active');
    });



    /*---------------------------
                                  MENU TOGGLE
    ---------------------------*/
    var init = false;
    $('.menu-button').on('click', function(event) {
        event.preventDefault();
        var target = $(this).data('target');
        $(this).toggleClass('active');
        $('' + target + '').toggleClass('active');
        clearInterval(interval);

        if ($('' + target + '').hasClass('active')) {
            $('' + target + '').css({
                'transform': 'translateX(0%)'
            });
            $('' + target + ' .side-slider').css('transform', 'translateY(0)');
            $('' + target + ' .navigation').css('transform', 'translateY(0)');
            if (!$('' + target + '#slider').hasClass('active') && init == false) {
                init = true;
                $(function(){
                    if(!flux.browser.supportsTransitions)
                        alert("Flux Slider requires a browser that supports CSS3 transitions");
                        
                    window.f = new flux.slider('' + target + ' #slider', {
                        pagination: false,
                        autoplay: true,
                        transitions: ['blocks2']
                    });  
                });
            } else if (!$('' + target + '#slider').hasClass('active') && init == true) {
                window.f.start();
            }
            $('#slider').addClass('active');
        } else {
            $('' + target + ' .side-slider').css('transform', 'translateY(100%)');
            $('' + target + ' .navigation').css('transform', 'translateY(-100%)');
             setTimeout(function(){
                $('' + target + '').css({
                    'transform': 'translateX(-100%)'
                });
            }, 400);
            if ( $('#fullpage').length > 0 ) {
                timer();
            }
            window.f.stop();
        }
    });



    /*---------------------------
                                  Magnific popup
    ---------------------------*/
    $('.magnific').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',
        modal: false,

        closeBtnInside: true,
        preloader: false,
        
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });



    /*----------------------------
                              SEND FORM
    -------------------------*/
    /**
     *
     * Open popup
     *
     * @param popup {String} jQuery object (#popup)
     *
     * @return n/a
     *
    */
    function openPopup(popup){
        $.magnificPopup.open({
            items: {
              src: popup
            },
            type: 'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            modal: false,
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-slide-bottom'
        }, 0);
    }

    $('form').on('submit', function(event) {
        event.preventDefault();
        /* Act on the event */
        var data = $(this).serialize();
        $.ajax({
            url: theme.url + '/forms.php',
            type: 'POST',
            data: data,
            success: function(result){
                if (result.status == 'ok') {
                    openPopup('#modal-popup-ok')
                } else {
                    openPopup('#modal-popup-error')
                }
            },
            error: function(result) {
                openPopup('#modal-popup-error');
            }
        })
        .always(function() {
            $('form').each(function(index, el) {
                $(this)[0].reset();
            });
        });
        
    });


    var map;
    function googleMap_initialize() {
        var lat = $('#map_canvas').data('lat');
        var long = $('#map_canvas').data('lng');

        var mapMarkerCoord = new google.maps.LatLng(lat, long);
        
        var mapCenterCoord = new google.maps.LatLng(lat, long-0.1);
        var mapMarkerCoord = new google.maps.LatLng(lat, long);
        
        if ( $(window).width() <= 1024 ) {
            mapCenterCoord = new google.maps.LatLng(lat, long);
            mapMarkerCoord = new google.maps.LatLng(lat, long);
        }

        $(window).resize(function(event) {
            if ( $(window).width() <= 1024 ) {
                mapCenterCoord = new google.maps.LatLng(lat, long);
                mapMarkerCoord = new google.maps.LatLng(lat, long);
            } else {
                mapCenterCoord = new google.maps.LatLng(lat, long-0.1);
                mapMarkerCoord = new google.maps.LatLng(lat, long);
            }
        });



        var mapOptions = {
            center: mapCenterCoord,
            zoom: 12,
            //draggable: false,
            disableDefaultUI: true,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var styles = [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}];


        map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
        map.setOptions({styles: styles});
        var markerImage = new google.maps.MarkerImage('images/location.svg');
        var marker = new google.maps.Marker({
            icon: markerImage,
            position: mapMarkerCoord, 
            map: map,
            title:"LeaderGate"
        });
      
        $(window).on('resize', function (event){
            map.setCenter(mapCenterCoord);
        });
    }

    if ( $('#map_canvas').length > 0) {
        googleMap_initialize();   
    }

}); // end file