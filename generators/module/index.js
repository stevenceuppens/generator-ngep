'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The subgenerator name'
    });

    this.log('You called the Ngep subgenerator with the argument ' + this.name + '.');
  },

  prompting: function () {
    var done = this.async();

    var prompts = [
      {
        type: 'input',
        name: 'moduleName',
        message: 'Your module name',
        default: this.name
      }
    ];

    this.prompt(prompts, function (props) {
      this.moduleName = props.moduleName;
      this.moduleSlug = this._.slugify(props.moduleName);

      this.ngModules = this.config.get('ngModules');

      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('module.js'),
      this.destinationPath('src/app/modules/' + this.moduleSlug + '/' + this.moduleSlug + '.module.js'),
      this
    );
  }
});
