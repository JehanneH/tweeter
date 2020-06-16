
$(document).ready(function() {
  
  $('#tweet-text').on('keyup', function() {
    let charsLeft = 140 - $(this).val().length;

    let counter = $(this)
      .siblings()
      .find('.counter')
      .text(charsLeft)
    
    if (charsLeft < 0) {
      counter.addClass('color-red')
    } else {
      counter.removeClass('color-red')
    }
  });
  
});