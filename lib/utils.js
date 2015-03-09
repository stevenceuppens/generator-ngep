var fs = require('fs');
var path = require('path');
var inquirer = require('inquirer');

function getDirectories(srcpath) {
	if(!fs.existsSync(srcpath)) {
		return [];
	}
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
};

exports.getModuleList = function(srcpath) {
  var modules = getDirectories(srcpath);
  modules.push(new inquirer.Separator());
  modules.push('new module');
  return modules;
};