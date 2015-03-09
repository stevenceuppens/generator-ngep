'use strict';
var yeoman = require('yeoman-generator');
var inquirer = require('inquirer');

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
        name: 'moduleSlug',
        message: 'Select your module',
        store: true,
        choices: ['core', new inquirer.Separator(), 'new module']
      }
    ];

    this.prompt(prompts, function (props) {
      this.filterName = props.filterName;
      this.filterSlug = this._.slugify(props.filterName);
      this.moduleSlug = props.moduleSlug

      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('filter.js'),
      this.destinationPath('src/app/modules/' + this.moduleSlug + '/filters/' + this.filterSlug + '/' + this.filterSlug + '.filter.js'),
      this
    );
  }
});
