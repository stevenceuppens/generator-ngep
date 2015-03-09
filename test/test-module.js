'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('Ngep:module', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/module'))
      .withArguments('name', '--force')
      .withOptions({ 'skip-install': true })
      .withPrompt({
        moduleName: "my module"
      })
      .on('end', done);
  });

  describe('app files', function () {
    
    it('creates app files', function () {
      assert.file([
        'src/app/modules/my-module/my-module.module.js'
      ]);
    });

    it('my-module.module.js should contain module name', function () {
      assert.fileContent('src/app/modules/my-module/my-module.module.js', /angular\.module\('app.my-module'/);
    });

  });
});