$(document).ready(function() {
  const tweetLimit = 140;
  $('#tweet-text').on('keyup', function() {
    let charsLeft = tweetLimit - $(this).val().length;

    let counter = $(this)
      .siblings()
      .find('.counter')
      .text(charsLeft);
    
    if (charsLeft < 0) {
      counter.addClass('color-red');
    } else {
      counter.removeClass('color-red');
    }
  });
});