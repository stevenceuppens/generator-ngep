'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('ngep:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        appName: "my project"
      })
      .on('end', done);
  });

  describe('generic files', function () {

    it('creates generic files', function () {
      assert.file([
        '.editorconfig',
        '.jshintrc'
      ]);
    });

  });

  describe('project files', function () {

    it('creates project files', function () {
      assert.file([
        'bower.json',
        'package.json'
      ]);
    });

    it('bower.json should contain project name as name', function () {
      assert.fileContent('bower.json', /"name": "my-project"/);
    });

    it('package.json should contain project name as name', function () {
      assert.fileContent('package.json', /"name": "my-project"/);
    });

  });

  describe('app files', function () {

    it('creates app files', function () {
      assert.file([
        'src/index.html',
        'src/app/app.js'
      ]);
    });

    it('index.html should contain project name as title', function () {
      assert.fileContent('src/index.html', /<title>my-project<\/title>/);
    });
    
  });
});
