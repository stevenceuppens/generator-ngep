'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the dazzling ' + chalk.red('Ngep') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'appName',
        message: 'Your application name',
        default: this.appname
      },
      {
        type: 'checkbox',
        name: 'ngModules',
        message: 'Angular modules',
        choices: ['ui-router','restangular','ng-resource']
      }
    ];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.appSlug = this._.slugify(props.appName);
      this.ngModules = props.ngModules;

      this.config.set('ngModules', this.ngModules);

      done();
    }.bind(this));
  },

  writing: {
    genericfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    },

    projectfiles: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this
      );
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        this
      );
    },

    app: function () {
      this.fs.copyTpl(
        this.templatePath('src/index.html'),
        this.destinationPath('src/index.html'),
        this
      );
      this.fs.copyTpl(
        this.templatePath('src/app/app.js'),
        this.destinationPath('src/app/app.js'),
        this
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
