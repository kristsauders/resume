var exec = require('child_process').exec,
    assert = require('assert'),
    path = require('path');

exports['test resume app'] = function(assert, done) {
  exec('node app.js', function(error, stdout, stderr) {
        assert.equal(error, null, error);
        assert.notEqual(stdout, null, stdout);
        done();
    });
    
    setTimeout(function(){
        exec('xvfb-run wkhtmltopdf http://localhost:8084/resume.html ' + __dirname + '/public/Krists_Auders_Resume.pdf'), function(error, stdout, stderr) {
            assert.equal(error, null, error);
            done();
        });
    }, 10000);
}

if (module == require.main) require('test').run(exports)
