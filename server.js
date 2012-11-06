var express = require('express'),
    app = express();
    
app.use(express.static(__dirname));

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    console.log(req.headers);
    //if(req.headers.origin)
        //res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Max-Age', '600');
    res.header('Access-Control-Allow-Headers', 'Content-Type,UDID,X-Speech-Context,User-Agent,ClientId,ClientSecret,Authorization');

    next();
}

app.use(allowCrossDomain);


app.all('/', function(req, res){
    var options = {};
    options.data = req.body;
    options.headers = req.headers;
    options.headers.host = 'api-uat.bf.pacer.sl.attcompute.com';
    delete options.headers.origin;
    options.query = req.query;
    console.log(req.method + ': ' + req.path);
    res.send(200);
});

//rest.post('http://user:pass@service.com/action', {
//  data: { id: 334 },
//}).on('complete', function(data, response) {
//  if (response.statusCode == 201) {
//    // you can get at the raw response like this...
//  }
//});

// multipart request sending a 321567 byte long file using https
//rest.post('https://twaud.io/api/v1/upload.json', {
//  multipart: true,
//  username: 'danwrong',
//  password: 'wouldntyouliketoknow',
//  data: {
//    'sound[message]': 'hello from restler!',
//    'sound[file]': rest.file('doug-e-fresh_the-show.mp3', null, 321567, null, 'audio/mpeg')
//  }
//}).on('complete', function(data) {
//  sys.puts(data.audio_url);
//});

app.listen(8082);
console.log('Started up successfully.');