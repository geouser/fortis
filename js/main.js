// Global parameters
window.params = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent)
};



for ( var i = 1; i <= 4; i++ ) {
    $('.partners-box').prepend('<div class="partner-item"></div>');
}
$(window).on('load resize', function(event) {
    event.preventDefault();
    var vh = $(this).height() - 60;
    $('.partner-item').height( vh/5 );
});


jQuery(document).ready(function($) {

    if ( $('.scroll').length > 0 ) {
        $('.scroll').mCustomScrollbar({
            theme: 'dark',
            axis: 'y'
        });
    }






    $('body').addClass('loaded');

    setTimeout(function(){
        $('.section--1 .section__title').addClass('magictime spaceInLeft');
    }, 1000);
    setTimeout(function(){
        $('.section--1 .section__text').addClass('magictime spaceInLeft');
    }, 1600);
    setTimeout(function(){
        $('.section--1 .button').addClass('magictime boingInUp');
    }, 2400);

    /*---------------------------
                                  Fullpage
    ---------------------------*/
    var interval;
    var timer = function(){
        interval = setInterval(function(){
           $.fn.fullpage.moveSectionDown(); 
        },6000);
    };

    if ($(window).width() > 1200) {
       if ( $('#fullpage').length > 0 ) {
            $('#fullpage').fullpage({
                //Navigation
                menu: '#menu',
                lockAnchors: false,
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
                responsiveWidth: 1200,
                loopBottom: true,

                //Custom selectors
                sectionSelector: '.section',
                slideSelector: '.slide',

                //events
                onLeave: function(index, nextIndex, direction){},
                afterLoad: function(anchorLink, index){
                        setTimeout(function(){
                            $('.active .section__title:not(.section--1 .section__title)').addClass('magictime spaceInLeft');
                        }, 100);
                        setTimeout(function(){
                            $('.active .section__text:not(.section--1 .section__text)').addClass('magictime spaceInLeft');
                        }, 500);
                        setTimeout(function(){
                            $('.active .button:not(.section--1 .button)').addClass('magictime boingInUp');
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
    }
    



    /*---------------------------
                                  MENU TOGGLE
    ---------------------------*/
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
            $('' + target + ' #slider').css('transform', 'translateY(0)');
            $('' + target + ' .navigation').css('transform', 'translateY(0)');
            if (!$('' + target + '#slider').hasClass('active')) {
                $(function(){
                    if(!flux.browser.supportsTransitions)
                        alert("Flux Slider requires a browser that supports CSS3 transitions");
                        
                    window.f = new flux.slider('' + target + ' #slider', {
                        pagination: false,
                        autoplay: true,
                        transitions: ['blocks2']
                    });
                    console.log('go');  
                });
            }
            $('#slider').addClass('active');
        } else {
            $('' + target + ' #slider').css('transform', 'translateY(100%)');
            $('' + target + ' .navigation').css('transform', 'translateY(-100%)');
             setTimeout(function(){
                $('' + target + '').css({
                    'transform': 'translateX(-100%)'
                });
            }, 400);
            timer();
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

}); // end file