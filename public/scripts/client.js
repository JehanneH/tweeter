/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  // function to escape text to avoid xss
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // link arrow in nav bar toggles new tweet box
  $('#arrow').click(function() {
    $('.new-tweet').slideToggle();
  });

  // function createTweetElement that takes in a tweet object
  // and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet
  const createTweetElement = function(tweet) {
    const htmlTweet = `
    <article class="tweets">
      <header>
      <div class="person-info">
        <img class="icon" src="${tweet.user.avatars}" />
        <h4 class="person">${tweet.user.name}</h4>
      </div>
        <h4 class="account">${tweet.user.handle}</h4>
      
      </header>
      <div class="tweet-placeholder">
        <p>${escape(tweet.content.text)}</p>
      </div>
      <footer>
        <p>${moment(tweet.created_at).fromNow()}</p>
        <div>
          <i class="fa fa-flag" aria-hidden="true"></i>
          <i class="fa fa-retweet" aria-hidden="true"></i>
          <i class="fa fa-heart" aria-hidden="true"></i>
        </div>
        </footer>
      </article>
  `;
    return htmlTweet;
  };

  // function takes in array of tweet objects and appends each one to the .tweets
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      $('#tweet-list').prepend(createTweetElement(tweet));
    }
  };

  // AJAX POST request
  $('form').on('submit', function(event) {
    event.preventDefault();

    const tweetLimit = 140;
    const tweetText = $('#tweet-text').val();

    $('form').validate;

    if (tweetText.length > tweetLimit) {
      $('.isa-error').slideDown();

      setTimeout(function() {
        $(".isa-error").slideUp();
      }, 4000);

    } else if (tweetText === '') {
      $('.isa-warning').slideDown();

      setTimeout(function() {
        $(".isa-warning").slideUp();
      }, 4000);

    } else {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize()
      }).then(function() {
        loadTweets();
        $('#tweet-text').val("");
        $('.counter').text(tweetLimit);
      });
    }
  });

  // AJAX GET request that fetches tweets from /tweets
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'JSON'
    }).then(function(response) {
      $('#tweet-list').empty();
      renderTweets(response);
    });
  }
  loadTweets();
});