
$(document).ready(function(){

  $('#age-verefier').fadeIn('slow');

    $('.open-icon').click(function(){
      console.log('working?');
      $('#nav-mobile').animate({
        left:'0px'
      }, 200);
      $('body').animate({
        left: '285px'
      }, 200);
    })

    $('.close').click(function(){
      console.log('working?');
      $('#nav-mobile').animate({
        left:'-285px'
      }, 200);
      $('body').animate({
        left: '0'
      }, 200);
    })

    $('#btn-confirm').click(function(){
        $("#age-verefier").fadeOut(1000);
    });

    $('.open-icon').click(function(){
      $(this).toggleClass("close");

    });


  // smooth scroll

    $(function() {
      $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });
    });

  // show and hide totop btn on terms, privacy, and faqs pages.

  var  n = $(".totop");
      ns = "totop-show";
     hdr = $('#legal-header').height();

  $(window).scroll(function() {
    if( $(this).scrollTop() > hdr ) {
      n.addClass(ns);

    } else {
      n.removeClass(ns);
    }
  });



  $.fn.visible = function(partial) {

      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;

    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

  };


  $(window).scroll(function(event) {

    $(".module").each(function(i, el) {
      var el = $(el);
      if (el.visible(true)) {
        el.addClass("come-in");
      }
    });

  });


  var win = $(window);
  var allMods = $(".module");

  // Already visible modules
  allMods.each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("already-visible");
    }
  });

  win.scroll(function(event) {

    allMods.each(function(i, el) {
      var el = $(el);
      if (el.visible(true)) {
        el.addClass("come-in");
      }
    });

  });


  $(".over").click(function(event){
    // $("#age-verefier").addClass('age-verefier-hide');
    $("#age-verefier").fadeOut();
    $('.page').addClass('active');
    $('.hero-img').addClass('come-down');
    $('.hero-text').addClass('come-in');
  })



});
