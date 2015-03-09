'use strict';

(function(window, document, angular) {

	angular.module('app.<%= moduleSlug %>')

	.filter('<%= filterSlug %>', function () {
		return function(text) {
			return text;
		};
	});

})(window, document, angular);