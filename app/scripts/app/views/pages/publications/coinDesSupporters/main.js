var $      = require('jquery'),
Handlebars = require('handlebars'),
Backbone   = require('backbone'),
template   = require('./template.hbs');

var masonry = require('masonry-layout');

module.exports = Backbone.View.extend({

	el: '#content-lvl2',

	initialize: function(){
		this.render();
		console.log($.fn.masonry);
	},

	bindEvent: function(){

	},

	unbindEvents: function(){

	},

	initMasonery: function(){
		var msnry = new masonry( '.grid-item', {
		  	columnWidth: 300,
		  	gutter: 30	
		});
	},

	render: function(){
		this.$el.html( template({tpl : 'COIN DES SUPPORTER'}) );
		setTimeout(function() {
			this.initMasonery();
	    }.bind(this), 0);
	},

	remove: function(){
		this.$el.empty(); /* off to unbind the events */
		this.undelegateEvents();
      	this.stopListening();
      	return this;
	}
});