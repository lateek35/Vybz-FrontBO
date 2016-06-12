var $      = require('jquery'),
Handlebars = require('handlebars'),
Backbone   = require('backbone'),
template   = require('./template.hbs');

module.exports = Backbone.View.extend({

	el: '#content',
	months : '.months li',

	initialize: function(){
	},

	bindEvent: function(){
		$(this.months).on('click', this.toggleMenu.bind(this) );

	},

	unbindEvents: function(){
		$(this.months).off('click', this.toggleMenu.bind(this) );
	},

	toggleMenu: function(e){
		var target = e.currentTarget;
		this.$el.find('.selected').toggleClass('selected', false);
		$(target).toggleClass('selected', true);
	},

	render: function(){
		this.$el.html( template({tpl : 'MATCHS'}) );
		this.bindEvent();
	},
	
	remove: function(){
		this.unbindEvents();
		this.$el.empty(); /* off to unbind the events */
		this.undelegateEvents();
      	this.stopListening();
      	return this;
	}
});
	