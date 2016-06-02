var $      = require('jquery'),
Handlebars = require('handlebars'),
Backbone   = require('backbone'),
template   = require('./template.hbs');

module.exports = Backbone.View.extend({

	el: 'body',

	initialize: function(){
		this.render();
	},

	render: function(){
		$(this.el).html( template({tpl : 'HOME'}) );
	}
});