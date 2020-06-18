/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {

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
        <p>${tweet.content.text}</p>
      </div>
      <footer>
        <p>${tweet.created_at} days ago </p>
        <div>
          <i class="fa fa-flag" aria-hidden="true"></i>
          <i class="fa fa-retweet" aria-hidden="true"></i>
          <i class="fa fa-heart" aria-hidden="true"></i>
        </div>
        </footer>
      </article>
  `
    return htmlTweet;
  }
  // function takes in array of tweet objects and appends each one to the .tweet-container
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      $('#tweet-list').prepend(createTweetElement(tweet));
    }
  }

  // AJAX POST request 
  $('form').on('submit', function(event) {
    event.preventDefault();

    const tweetLimit = 140;
    const tweetText = $('#tweet-text').val();

    if (tweetText.length > tweetLimit) {
      alert("Tweet too long!");

    } else if (tweetText === '') {
      alert("Tweet is empty!");

    } else {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize()
      }).then(function() {
        // console.log('success!', this)
        loadTweets();
        $('#tweet-text').val("");
      })
    }
  });

  // AJAX GET request that fetches tweets from /tweets
  const loadTweets = function() {
    $('form').on('submit', function(event) {
      event.preventDefault();
      // console.log("registered");
      $.ajax({
        url: '/tweets',
        method: 'GET',
        dataType: 'JSON'
      }).then(function(response) {
        $('.tweet-container').empty();
        renderTweets(response);
      })
    })
  }
  // loadTweets(); ???

});