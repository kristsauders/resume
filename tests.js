var exec = require('child_process').exec;

exports['test resume app'] = function(assert, done) {
    // Start up the app
  exec('node app.js', function(error, stdout, stderr) {
        assert.equal(error, null, error);
        assert.notEqual(stdout, null, stdout);
        done();
    });
    
    // Wait for app to start, then rebuild PDF
    setTimeout(function(){
        exec('xvfb-run wkhtmltopdf http://localhost:8084/resume.html ' + process.cwd() + '/public/Krists_Auders_Resume.pdf', function(error, stdout, stderr) {
            assert.equal('xvfb-run wkhtmltopdf http://localhost:8084/resume.html ' + process.cwd() + '/public/Krists_Auders_Resume.pdf', "", 'xvfb-run wkhtmltopdf http://localhost:8084/resume.html ' + process.cwd() + '/public/Krists_Auders_Resume.pdf');
            assert.equal(stderr, "", stderr);
            assert.equal(stdout, "", stdout);
            assert.equal(error, "", error);
            done();
        });
    }, 10000);
}

if (module == require.main) require('test').run(exports)
