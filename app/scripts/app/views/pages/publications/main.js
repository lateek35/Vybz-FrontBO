var $      = require('jquery'),
Handlebars = require('handlebars'),
Backbone   = require('backbone'),
template   = require('./template.hbs');

var ALaUneView = require('./aLaUne/main'),
	CoinDesSupportersView = require('./coinDesSupporters/main');


module.exports = Backbone.View.extend({

	el: '#content',
	tabs: '#publications .tab',
	aLaUneBool : true,
	aLaUne : null,
	coinDesSupporters : null,

	initialize: function(){
	},

	loadTab: function(){
		if (this.aLaUneBool) {
			this.coinDesSupporters && this.coinDesSupporters.remove();
			this.aLaUne = new ALaUneView();
		}else{
			this.aLaUne && this.aLaUne.remove();
			this.coinDesSupporters = new CoinDesSupportersView();
		}
	},

	bindEvent: function(){
		$(this.tabs).on('click', this.toggleMenu.bind(this) );

	},

	unbindEvents: function(){
		$(this.tabs).off('click', this.toggleMenu.bind(this) );
	},

	toggleMenu: function(e){
		var target = e.currentTarget;
		this.$el.find('.active').toggleClass('active', false);
		$(target).toggleClass('active', true);
		this.aLaUneBool = !this.aLaUneBool;
		this.loadTab();
	},

	render: function(){
		this.$el.html( template({tpl : 'PUBLICATIONS'}) );
		this.bindEvent();
		this.loadTab();
	},

	remove: function(){
		this.$el.empty(); /* off to unbind the events */
		this.undelegateEvents();
      	this.stopListening();
      	return this;
	}
});