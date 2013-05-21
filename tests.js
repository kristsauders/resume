exports['test resume app'] = function(assert, done) {
  require('child_process').exec('node app.js', function(error, stdout, stderr) {
        assert.equal(error, null, error)
        asser.notEqual(stdout, null, stdout)
        done()
    });
}

if (module == require.main) require('test').run(exports)
