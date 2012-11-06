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

app.listen(8084);
console.log('Started up successfully.');
