var express = require('express'),
    app = express()
    util  = require('util'),
    exec = require('child_process').exec,
    rest = require('restler'),
    nodemailer = require('nodemailer'),
    config = require('./config.js'),
    callback = '';
    
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

//CORS middleware for anyone accessing my resume/API with cross-domain Javascript
var allowCrossDomain = function(req, res, next) {
    //console.log(req.headers);
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Max-Age', '600');
    }
    next();
}

app.use(allowCrossDomain);

// Function for sending an e-mail using my Gmail address
function sendMail(address, subject, text) {
    //General send e-mail
    // create reusable transport method (opens pool of SMTP connections)
    var smtpTransport = nodemailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: config.email.username,
            pass: config.email.password
        }
    });
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: "Krists Auders <kristsauders@gmail.com>", // sender address
        to: address, // destination address
        subject: subject, // Subject line
        text: text, // plaintext body
    }
    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
    
        // Shut down the connection pool, since this doesn't happen often enough to keep it open
        smtpTransport.close();
    });
}

// Path to post to for sending an e-mail message, should probably be more secure than this..
app.post('/email', function(req, res) {
    sendMail(req.body.address, req.body.subject, req.body.text);
    res.send(200);
});

// This is for receiving callbacks from AT&T when an SMS message arrives
// in order to respond to an API Call contact from the resume
app.all('/callback', function(req, res) {
    console.log('Received SMS on ' + req.body.DateTime + ' from ' + req.body.SenderAddress);
    console.log(req.body.Message);
    res.send(200);
    console.log('Posting API response to ' + callback);
    rest.postJson(callback, {
                "message": req.body.Message,
                "name": "Krists Auders",
                "callback": "http://kristsauders.com/messages"
        }).on('complete', function(data) {
            console.log(data);
    });
});

// This is the endpoint for contacting me via API Call
app.post('/messages', function(req, res) {
    callback = req.body.callback;
    rest.post('https://api.att.com/rest/sms/2/messaging/outbox', {
            data: {
                "Address": "tel:8588228604",
                "Message": req.body.name + ": " + req.body.message
            },
            headers: {
                "Authorization": "BEARER 441b6a6c38a433eb5f3a40e66f8874b0"
            }
        }).on('complete', function(data) {
            console.log(data);
    });
    
    res.send('\n\n\n\
-----------------------------------------\n\
Thank you for your message, ' + req.body.name + '! \n\
I will reply with an HTTP POST to your callback URL: ' + req.body.callback + '\n\
-----------------------------------------\
\n\n\n');
});

// Listen only from localhost, since this will be routed through a local Nginx proxy
app.listen(8084, '127.0.0.1');

// Rebuild PDF version of resume periodically
setInterval(function() {
    var date = new Date();
    console.log('Rebuilding PDF resume on ' + date.toLocaleString());
    exec('xvfb-run --server-args="-screen 0, 1280x1024x24" ' + __dirname + '/wkhtmltopdf --use-xserver http://kristsauders.com/resume/resume.html ' + __dirname + '/Krists_Auders_Resume.pdf', function(error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error);
        }
    });
}, 600000);

console.log('Started up successfully.');
