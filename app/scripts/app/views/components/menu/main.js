var $      = require('jquery'),
Handlebars = require('handlebars'),
Backbone   = require('backbone'),
template   = require('./template.hbs');

module.exports = Backbone.View.extend({

	el: '#menu',
	li: '#menu li',

	initialize: function(){
		this.render();
		this.addEvent();
		this.removeEvent();
	},

	addEvent: function(){
		$(this.li).on('click', this.toggleMenu.bind(this) );
	},

	removeEvent: function(){
		$(this.li).off('click', this.toggleMenu.bind(this) );
	},

	toggleMenu: function(e){
		var target = e.currentTarget;
		$('.selected').toggleClass('selected', false);
		$(target).toggleClass('selected', true);
	},	

	render: function(){
		$(this.el).html( template({tpl : 'Menu'}) );
	}
});