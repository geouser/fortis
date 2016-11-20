// Global parameters
window.params = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent)
};


jQuery(document).ready(function($) {

    $('body').addClass('loaded');

    setTimeout(function(){
        $('.section--1 .section__title').addClass('magictime spaceInLeft');
    }, 1000);
    setTimeout(function(){
        $('.section--1 .section__text').addClass('magictime spaceInLeft');
    }, 1400);
    setTimeout(function(){
        $('.section--1 .button').addClass('magictime boingInUp');
    }, 2400);

    /*---------------------------
                                  Fullpage
    ---------------------------*/
    if ($(window).width() > 1200) {
       if ( $('#fullpage').length > 0 ) {
            $('#fullpage').fullpage({
                //Navigation
                menu: '#menu',
                lockAnchors: false,
                anchors:['firstPage', 'secondPage'],
                navigation: true,
                navigationPosition: 'left',
                navigationTooltips: ['firstPage', 'secondPage'],
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
                },
                afterRender: function(){},
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
        $(this).toggleClass('active');
        $(this).siblings('.sidebar').toggleClass('active');
        if ($('.sidebar').hasClass('active')) {
            $('.sidebar').css({
                'left': '0',
                'opacity': '1'
            });
            $('#slider').css('top', '0');
            $('.mainNav').css('top', '0');
        } else {
            $('#slider').css('top', '100%');
            $('.mainNav').css('top', '-100%');
             setTimeout(function(){
                $('.sidebar').css({
                    'opacity': '0',
                    'bottom': '-100%'
                });
            }, 400);
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