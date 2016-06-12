var $      = require('jquery'),
Handlebars = require('handlebars'),
Backbone   = require('backbone'),
Tweenlite   = require('gsap'),
template   = require('./template.hbs');

module.exports = Backbone.View.extend({

	el: '#content',
	modal : '.add-new',
	cvv: '.cvv',

	events: {
	    'click .add-pari': 'showModal',
	    'click .add-pari-validate' : 'validModal',
	    'click .add-new' : 'validModal',
	    'click .middle' : 'clickOutside',
	    'click .add-one>.add' : 'addPossibilities'
	},

	initialize: function(){
		this.render();
	},

	bindEvent: function(){

	},

	unbindEvents: function(){

	},

	addPossibilities: function(){
		$(this.cvv).append('<input type="text" class="name"><input type="text" class="cote">');
	},

	clickOutside: function(e){
		e.stopPropagation();
	},

	showModal: function(){
		console.log('showModal');
	 	Tweenlite.to( this.modal, 0.8, { autoAlpha : 1 });
	},

	validModal: function(){
		$(this.modal).find('input').val('');
	 	Tweenlite.to( this.modal, 0.8, { autoAlpha : 0 });
	},

	render: function(){
		this.$el.html( template({tpl : 'PARIS'}) );
	},

	remove: function(){
		this.$el.empty(); /* off to unbind the events */
		this.undelegateEvents();
      	this.stopListening();
      	return this;
	}
});