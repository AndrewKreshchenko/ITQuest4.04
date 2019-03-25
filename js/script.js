/*jQuery.fn.hasScrollBar = function(direction) {
    if (direction == 'vertical') {
        return this.get(0).scrollHeight > this.innerHeight();
        console.log('vertical');
    }
    else if (direction == 'horizontal') {
        return this.get(0).scrollWidth > this.innerWidth();
        console.log('horizontal');
    }
    return false;
}*/

function readyGallery() {
    /* baguetteBox.js slider init */
    //baguetteBox.run('#gallery');
    baguetteBox.run('#gallery', {
        //buttons: true,
        captions: function(element) {
            return element.getAttribute('data-gr');
        }
    });
}

/* Scroll */
var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
/*if (isAndroid || ($(window).width() <= 768)) {//window.location = 'http://android.davidwalsh.name';
    window.location.href = "indexmob.html";
    //$('#main_s').removeClass('front scroll');
   // $("#mob").append('<pre style="background-color: transparent"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></pre>');
}*/

/* Navigation */
var ind_ = 1;//erase later
autoCollapseMenu();
function autoCollapseMenu() {
    setTimeout(function () {
        $('.navbar').removeClass('opened') 
    }, 
    5000);
}
function to_section(i) {
    $('.navbar .nav-item.active').removeClass('active');
    if (!$('.navbar .nav-item').eq(i-1).hasClass('active')) {
        $('.navbar .nav-item').eq(i-1).addClass('active');
    }

    var $el = $('#section_'+i);
    if (typeof($el !== 'undefined')) { // it may be also necessary to check if $el !== null
        let offset = $el.offset();
        if (i == 4 && ind_ == 3) {
            let wh = $(window).height();
            $('#main').scrollTo({top:'+='+(wh-100)+'px', left:0}, 1200).removeClass('current');
        }
        else if (i == 3 && ind_ == 4) {
            let wh = $(window).height();
            $('#main').scrollTo({top:'-='+(wh-100)+'px', left:0}, 1200).removeClass('current');
        }
        else if (i == 2) {
            let ww = $(window).outerWidth();
            $('#main').scrollTo({top:offset.top+'px', left:(offset.left)+'px'}, 1200).removeClass('current');
        }
        else {
            $('#main').scrollTo({top:offset.top+'px', left:offset.left+'px'}, 1200).removeClass('current');
        }
    }
    ind_ = i;
}

function headerActions() {
    var $c = $('#letter-q-circle'), $l = $('#letter-q-line');
    if ($c.length && $l.length) {
        let o_c = $c.offset(), size = $c.outerWidth(); // $q.css('width', size_svg/2.5+'px');
        let o_l = {'top': (o_c.top+size/2.5), 'left': (o_c.left+size/2.5)};
        $l.offset(o_l);
        $l.css('opacity', 1);
    }
}

function section(i, depth) {
    // lang
    //detectLang();

    if(!scr) {
        // check scroll working
        scr = true;

        // scroll
		/*if (i === 1) {
			$('#main').scrollTo({top:'0', left:'290px'}, 800);
			$('#main').scrollTo($('#main'), 1000, { offset:{ top:'-=100px'} });
			scr = false;
			return;
		}*/
        if (depth !== depth_) {
            if (depth > depth_) {
                //$('#main').scrollTo('#section_'+i, 1000, { offset:{ top:'+='+100*(depth-depth_)+'px'} });
            }
            else {
                //$('#main').scrollTo('#section_'+i, 1000, { offset:{ top:'-='+100*(depth-depth_)+'px'} });
            }
            depth_ = depth;
        }
        else {
            $('#main').scrollTo('#section_'+i, 1000);
        }

        /*$('#main').scrollTo('#section_'+i, {
            duration:1000,
            axis: 'x',
            onAfter: function(){
                scr = false
            }
        });*/
    }
}
function to_invitation() {
    var h = $(window).outerHeight();
    console.log(h);
    $('#main').scrollTo({top:'100px', left:'20px'}, 800);
}
$('#to_invitation').click(function() {
    to_invitation();
    return false;
});
$('#details').click(function() {
    //to_invitation();
    //return false;
});

$('#xyscroll_test').click(function() {//onAfterFirst exists only when queuing
	$('#main').scrollTo($('#bl_5'), 1600, { 
		queue:true,
		onAfterFirst:function() {
			console.log('Got there horizontally!');
		},
		onAfter:function() {
			console.log('Got there vertically!');
		}
	});
});
$('#xyscroll_test2').click(function() {
	$('#main').scrollTo({top:'+=0px', left:'+=290px'}, 800);
    console.log('#xyscroll_test2');
});
/*$('#xyscroll_test').on('click', function() {
	var $el = $('#bl_5');
	//$('#main').scrollTo($el, 2500, { duration: 3000 });
	$('#main').scrollTo({top:'110px', left:'290px'}, 800);
});*/
$('#btn-menu-collapse').on('click', function() {
    $('.navbar').removeClass('opened');
});
$('#btn-menu-open').on('click', function() {
    var $li = $('.navbar .btn-3');
    $('.navbar').addClass('opened');
    if ($(window).outerWidth() < 550) {
        autoCollapseMenu();
    }
    /*$li.each(function(i, el) {
        console.log(el);
       $(el).animate({'transform': 'translateX(-5px)', 'transform': 'rotate(2deg)'}, 1000); 
    });*/
});

/* Gallery */
var opened_fol;
function controlGroups($el, i, level) {
    var data = $el.eq(i).data('target'), $checked = $('#g-list').find('label[name="'+level+'"]').next(':checked');
    $checked.prop('checked', false);
    if (level !== true) {
        $('#gallery').find('.current[data-group]').removeClass('current');
        $('#gallery').find('[data-group="'+data+'"]').addClass('current');
    }
}
//$('#gallery').attr('id', ''); //$('.tz-gallery[data-group="'+data+'"]').attr('id', 'gallery');
//$('#baguetteBox-overlay').remove();
//baguetteBox.run('.tz-gallery[data-group="'+data+'"]');
$('#g-list label[name="company"]').on('click', function() {
    controlGroups($('#g-list label[name="company"]'), $('#g-list label[name="company"]').index(this), 'company');
});
$('#g-list label[name="year"]').on('click', function() {
    controlGroups($('#g-list label[name="year"]'), $('#g-list label[name="year"]').index(this), 'year');
});
$('#g-list-groups').on('click', function() {
    $group_all = $('#gallery').find('[data-group="All"]');
    if ($(this).next(':checked').length) {
        $('#gallery').find('.current[data-group]').removeClass('current');
        if (!$group_all.hasClass('current'))
            $group_all.addClass('current');
    }
});

$(function() {
    var showcase = $("#carousel"), title = $('#item-title');

    /* Header animations */
    headerActions();

    /* Reveal blocks (animation) */
    window.sr = ScrollReveal({
        duration: 800
    });
    sr.reveal('#section_1', {
        duration: 400
    }).reveal('#header-right', {
        delay: 200,
        duration: 1500
    });
    /*if ($('#robot-sparks-decor').length) {
        $('#robot-sparks-decor').addClass('anim');
    }*/

    /* Gallery ready */
    readyGallery();
      /*showcase.Cloud9Carousel( {
        xRadius: 800,
        mirror: {
          gap: 12,
          height: 2,
          width: 500
        },
        buttonLeft: $("#buttons > .left"),
        buttonRight: $("#buttons > .right"),
        autoPlay: 0,
        bringToFront: true,
        onLoaded: function() {
          showcase.css( 'visibility', 'visible' )
          showcase.css( 'display', 'none' )
          showcase.fadeIn( 1000 )
        }
      });*/

      function rendered( carousel ) {
        title.text( carousel.nearestItem().element.alt )

        // Fade in based on proximity of the item
        var c = Math.cos((carousel.floatIndex() % 1) * 2 * Math.PI)
        title.css('opacity', 0.5 + (0.5 * c))
      }

      // Simulate physical button click effect
      var header = $('header'), btn = $('button.toggle-nav');
	  btn.on('click', function() {
          header.toggleClass('active');
	  });

      $('#nav > button').click( function( e ) {
        var b = $(e.target).addClass( 'down' )
        setTimeout( function() { b.removeClass( 'down' ) }, 80 )
      } )

      $(document).keydown( function( e ) {
        // More codes: http://www.javascripter.net/faq/keycodes.htm
        switch( e.keyCode ) {
          /* left arrow */
          case 37:
            $('#nav > .left').click()
            break

          /* right arrow */
          case 39:
            $('#nav > .right').click()
        }
      });
});
function normilize() {
    var gals = $(".tz-gallery").length;//divs = $('[class*="col-"], [class^="col-"]');
    var tmp = 1, l2 = 1;
    for (var i = 0; i < gals; i++) {
        let gk = $('.tz-gallery').eq(i).children('[class*="col-"]').length;
        if (gk > 4) {
            for (var j = gk; j > 3; j--) {
                let g = $('.tz-gallery').eq(i).children('[class*="col-"]').find("img").eq(j);
                g.css('width', '0');
            }
        }
    }
}
var magnifPopup = function() {
	$('.image-popup').magnificPopup({
		type: 'image',
		removalDelay: 300,
		mainClass: 'mfp-with-zoom',
		titleSrc: 'title',
		gallery:{
			enabled:true
		},
		zoom: {
			enabled: true, // By default it's false, so don't forget to enable it
			duration: 300, // duration of the effect, in milliseconds
			easing: 'ease-in-out', // CSS transition easing function
			// The "opener" function should return the element from which popup will be zoomed in and to which popup will be scaled down. By default it looks for an image tag:
			opener: function(openerElement) {
			// openerElement is the element on which popup was initialized, in this case its <a> tag you don't need to add "opener" option if this code matches your needs, it's defailt one.
			return openerElement.is('img') ? openerElement : openerElement.find('img');
			}
		}
	});
};
