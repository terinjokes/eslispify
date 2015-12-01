'use strict';
var expect = require('assume');
var eslispify = require('../');
var bl = require('bl');
var vm = require('vm');

var inputESL = '((lambda test () ((. console log) "test")))';

describe('eslispify', function() {
  it('should return the input untouched if the filename doesn\'t end in .esl', function(done) {
    done = expect.wait(1, 3, done);

    var s = eslispify('index.js');
    s.pipe(bl(function(err, buf) {
      expect(err).not.exists();
      expect(Buffer.isBuffer(buf)).is.true();
      expect(buf.toString()).equals(inputESL);
      done();
    }));

    s.write(inputESL);
    s.end();
  });

  it('should transform .esl files to JS', function(done) {
    done = expect.wait(2, 3, done);

    function log(msg) {
      expect(msg).to.equal('test');
      done();
    }

    var s = eslispify('index.esl');
    s.pipe(bl(function(err, buf) {
      expect(err).not.exists();
      expect(Buffer.isBuffer(buf)).is.true();
      vm.runInNewContext(buf, {
        console: {
          log: log
        }
      });
      done();
    }));

    s.write(inputESL);
    s.end();
  });
});
