var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res){

  url='https://www.youtube.com/user/graciehinabox/videos';

  request(url, function(error, response, html){

    if(!error){

      var $ = cheerio.load(html);

      var videoId, title;

      var vidAr = [];
      $('a.yt-uix-sessionlink.yt-uix-tile-link').each(function(i,e){
        var href = e.attribs.href;

        videoId = href.substring((href.indexOf('=') + 1), href.length);

        title = e.attribs.title;
        vidAr.push({'title': title, 'videoId':videoId});
      });

      fs.writeFile('output.json', JSON.stringify(vidAr, null, 4), function(err){
        console.log('File successfully written! - Check directory for output.json');
      });

      res.send('Check your console!');

    }

  });

});

app.listen('8081');

console.log('Listening to port 8081');

exports = module.exports = app;
