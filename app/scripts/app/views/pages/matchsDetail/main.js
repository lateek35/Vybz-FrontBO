var $      = require('jquery'),
Handlebars = require('handlebars'),
Backbone   = require('backbone'),
template   = require('./template.hbs'),
gsap       = require('gsap');


module.exports = Backbone.View.extend({

	el: '#content',

	initialize: function(){
		console.log(gsap);
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
		this.$el.empty(); /* off to unbind the events */
		this.undelegateEvents();
      	this.stopListening();
      	return this;
	}
});