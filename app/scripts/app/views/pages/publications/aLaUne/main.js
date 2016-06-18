var $      = require('jquery'),
Handlebars = require('handlebars'),
Backbone   = require('backbone'),
Tweenlite   = require('gsap'),
template   = require('./template.hbs');

module.exports = Backbone.View.extend({

	el: '#content-lvl2',
	modal : '.add-new',

	events: {
	    'click .add-account': 'showModal',
	    'click .add-account-validate' : 'validModal',
	    'click .add-new' : 'validModal',
	    'click .middle' : 'clickOutside'
	 },

	initialize: function(){
		this.render();
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
		this.$el.html( template({tpl : 'A LA UNE'}) );
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