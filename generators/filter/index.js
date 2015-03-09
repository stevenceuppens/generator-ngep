'use strict';

var yeoman = require('yeoman-generator');
var utils = require('../../lib/utils.js');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The filter name'
    });

    this.log('You called the Ngep filter generator with the argument ' + this.name + '.');
  },

  prompting: function () {
    var done = this.async();

    var prompts = [
      {
        type: 'input',
        name: 'filterName',
        message: 'Your filter name',
        default: this.name
      },
      {
        type: 'list',
        name: 'module',
        message: 'Select your module',
        store: true,
        choices: utils.getModuleList(this.destinationPath('src/app/modules/'))
      }
    ];

    this.prompt(prompts, function (props) {
      this.filterName = props.filterName;
      this.filterSlug = this._.slugify(props.filterName);
      this.module = props.module;

      done();
    }.bind(this));
  },

  configuring: {
    compose: function () {
      if(this.module === 'new module') {
        this.composeWith('ngep:module', { args: [''], options: this.options });
      }
    },
    postCompose: function () {
      if(this.module === 'new module') {
        this.moduleSlug = this._.slugify(this.options.moduleName);
      }
      else{
        this.moduleSlug = this.module;
      }
    }
  },

  writing: {
    appFiles: function () {
      this.fs.copyTpl(
        this.templatePath('filter.js'),
        this.destinationPath('src/app/modules/' + this.moduleSlug + '/filters/' + this.filterSlug + '/' + this.filterSlug + '.filter.js'),
        this
      );

      this.fs.copyTpl(
        this.templatePath('filter.spec.js'),
        this.destinationPath('src/app/modules/' + this.moduleSlug + '/filters/' + this.filterSlug + '/' + this.filterSlug + '.filter.spec.js'),
        this
      );
    }
  }
});
