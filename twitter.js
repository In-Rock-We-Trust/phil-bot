module.exports = (client) => {
    const Twit = require('twit');
    const config = require("./config.json");
    var twitterAccs = [ '2836755090', "1400067733"];
    
    var T = new Twit({
        consumer_key: config.consumer_key,
        consumer_secret: config.consumer_secret,
        access_token: config.access_token,
        access_token_secret: config.access_token_secret,
        timeout_ms:           60*1000,
        strictSSL:            true,     
    });

    client.once('ready', () => {
      var stream = T.stream('statuses/filter', { follow: twitterAccs });
      stream.on('tweet', function (tweet) {
        console.log(tweet);
        var url = "https://twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str;
        if (tweet.user.id_str == '2836755090'){
          try {
            client.channels.cache.get("772097042453364787").send(url)
          } catch (error) {
                console.error(error);
          } 

        } 
        if (tweet.user.id_str == '1400067733'){
          try {
            client.channels.cache.get("772097042453364787").send({
              content: url
            })
          } catch (error) {
                console.error(error);
          } 
        }
      });
    });
}