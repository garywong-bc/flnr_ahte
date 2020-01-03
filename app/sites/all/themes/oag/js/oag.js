(function ($) {
  $(document).ready(function() {
    
    
    // accordion dl
    $('#container .node dl').addClass('accordion');
    $('#container .node dl dd').hide();
    $('#container .node dl dt').click(function() {
      $(this).toggleClass('active').next('dd').slideToggle('fast')
        .siblings('dd:visible').slideUp('fast');
    });

    
    // nav toggle (mobile)
    $('#nav-toggle').click(function() {
      $('#navigation').toggleClass('active');
    });

    // lightbox support
    $('a[rel=lightbox]').colorbox();
    
  });
})(jQuery);
