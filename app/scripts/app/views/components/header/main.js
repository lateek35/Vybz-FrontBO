var $      = require('jquery'),
Handlebars = require('handlebars'),
Backbone   = require('backbone'),
template   = require('./template.hbs');

module.exports = Backbone.View.extend({

	el: '#header',

	initialize: function(){
		this.render();
	},

	render: function(){
		$(this.el).html( template({tpl : 'HEADER'}) );
	}
});