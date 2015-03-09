'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('Ngep:filter', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/filter'))
      .withArguments('name', '--force')
      .withOptions({ 'skip-install': true })
      .withPrompt({
        filterName: "my filter",
        module: "my-module"
      })
      .on('end', done);
  });

  describe('app files', function () {

    it('creates app files', function () {
      assert.file([
        'src/app/modules/my-module/filters/my-filter/my-filter.filter.js',
        'src/app/modules/my-module/filters/my-filter/my-filter.filter.spec.js'
      ]);
    });

    it('my-filter.filter.js should contain module name', function () {
      assert.fileContent('src/app/modules/my-module/filters/my-filter/my-filter.filter.js', /angular\.module\('app.my-module'/);
    });

    it('my-filter.filter.js should contain filter name', function () {
      assert.fileContent('src/app/modules/my-module/filters/my-filter/my-filter.filter.js', /filter\('my-filter'/);
    });

    it('my-filter.filter.spec.js should contain filter name', function () {
      assert.fileContent('src/app/modules/my-module/filters/my-filter/my-filter.filter.spec.js', /describe\('my-filter filter'/);
    });

  });
});
