"use strict";

var $      = require('jquery'),
Backbone   = require('backbone'),
Handlebars = require('handlebars');

var attachFastClick = require('fastclick'),
Header = require('../app/views/components/header/main.js'),
Menu = require('../app/views/components/menu/main.js');

module.exports = Backbone.View.extend({
	
	header: null,

	initialize: function(){
		attachFastClick(document.body);
		this.header = new Header();
		this.menu = new Menu();
	},

	render: function(){
		console.log('Render');
	}
});