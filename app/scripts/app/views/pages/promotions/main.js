var $      = require('jquery'),
Handlebars = require('handlebars'),
Backbone   = require('backbone'),
Tweenlite  = require('gsap'),
template   = require('./template.hbs');

module.exports = Backbone.View.extend({

	el: '#content',
	modal : '.add-new',

	events: {
	    'click .add-promo': 'showModal',
	    'click .add-promo-validate' : 'validModal',
	    'click .add-new' : 'validModal',
	    'click .middle' : 'clickOutside'
	},

	initialize: function(){
		this.bindEvent();
	},

	bindEvent: function(){

	},

	unbindEvents: function(){

	},

	clickOutside: function(e){
		e.stopPropagation();
	},

	showModal: function(){
	 	Tweenlite.to( this.modal, 0.8, { autoAlpha : 1 });
	},

	validModal: function(){
		$(this.modal).find('input').val('');
	 	Tweenlite.to( this.modal, 0.8, { autoAlpha : 0 });
	},

	render: function(){
		this.$el.html( template({tpl : 'PROMOTIONS'}) );
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