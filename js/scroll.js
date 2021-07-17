$(document).ready(function () {
    "use strict";

  //smooth scroll 
  /*when clicked on anchor tag get the href attribute and go to the same length*/
    $("a[href^='#']")
      .on('click', function (e) {
       var $target = $($(this).attr("href"));
        if ($target.length) {
            e.preventDefault();
            $("html, body").animate({
              scrollTop: $target.offset().top
            }, 1000);
        }
    });
  
  //scroll top
  //cache the up button
  var $up =  $(".up");

  /*when you scroll to top and height be larger than 80, show up button, and when scroll tops less than 80 hide button*/
  $(window).on("scroll", function () {
      //cache the window scroll in variable 
      var $scTop = $(this).scrollTop();
      if ($scTop > 80) {
            $up.fadeIn();
            //show up button
        } else {
            $up.fadeOut();
            //hide up button
        }
    });
    
  /* when clicked on up button go to top page in 1 second*/
    $up.on("click", function () {
        $("html, body").animate({
          scrollTop: 0 
          //you can change value as you like
        }, 1000);
    });
});