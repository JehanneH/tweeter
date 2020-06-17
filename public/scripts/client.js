/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// object from initial-tweets.json 
  // temp hard coded, but later will be loading from Express server via AJAX GET req

$(document).ready(function() {


  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

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
      <div class="tweet-text">
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
  // function takes in array of tweet objects and appends each one to the #tweets-container
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      $('#tweet-list').append(createTweetElement(tweet));
    }
  }
  renderTweets(data);

  // AJAX POST request 
  $('form').on('submit', function(event) {
    event.preventDefault();
    console.log("Registered");
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize()
    }).then(function() {
      console.log('success!', this)
      $('.tweet-container').empty();
      renderTweets(data);
    })
  });

  // GET request that fetches tweets from /tweets
  const loadTweets = function() {

  }

});