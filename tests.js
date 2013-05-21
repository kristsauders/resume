var exec = require('child_process').exec;
assert.ok(true, 'Running tests...');

exports['test resume app'] = function(assert, done) {
  exec('node app.js', function(error, stdout, stderr) {
        assert.equal(error, null, error);
        assert.notEqual(stdout, null, stdout);
        done();
    });
    setTimeout(function(){
      done();
    }, 10000);
}

if (module == require.main) require('test').run(exports)
