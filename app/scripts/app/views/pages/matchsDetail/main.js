var $      = require('jquery'),
Handlebars = require('handlebars'),
Backbone   = require('backbone'),
template   = require('./template.hbs');

module.exports = Backbone.View.extend({

	el: '#content',

	initialize: function(){
		this.bindEvent();
	},

	bindEvent: function(){

	},

	unbindEvents: function(){

	},

	render: function(){
		this.$el.html( template({tpl : 'MATCH DETAIL'}) );
	},

	remove: function(){
		this.$el.empty().off(); /* off to unbind the events */
      	this.stopListening();
      	return this;
	}
});