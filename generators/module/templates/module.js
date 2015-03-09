'use strict';

(function(window, document, angular) {

	angular.module('app.<%= moduleSlug %>', [<% _.each(ngModules, function(module, i) { %>'<%= module %>'<% if (i+1 < ngModules.length) { %>,<% }}); %>])

	.config(function () {

	})

	.run(function () {

	});

})(window, document, angular);