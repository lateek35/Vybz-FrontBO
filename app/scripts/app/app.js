"use strict";

var $      = require('jquery'),
Backbone   = require('backbone'),
Handlebars = require('handlebars');

var attachFastClick = require('fastclick');

module.exports = Backbone.View.extend({

	initialize: function(){
		attachFastClick(document.body);
	},

	render: function(){
		console.log('Render');
	}
});