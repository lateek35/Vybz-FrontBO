var $      = require('jquery'),
Backbone   = require('backbone'),
Handlebars = require('handlebars');


var StatsView = require('../views/pages/stats/main'),
	MatchsView = require('../views/pages/matchs/main'),
	ParisView = require('../views/pages/paris/main'),
	PublicationsView = require('../views/pages/publications/main'),
	PromotionsView = require('../views/pages/promotions/main');


module.exports = Backbone.Router.extend({

	initialize: function(){
		Backbone.history.start({pushState: true, hashChange: false});

		$(document).on("click", "a:not([data-bypass])", function(evt) {
		    var href = $(this).attr("href");
		    var protocol = this.protocol + "//";
		    if (href && href.slice(0, protocol.length) !== protocol &&
		        href.indexOf("javascript:") !== 0) {
				evt.preventDefault();
				Backbone.history.navigate(href,  {
		            trigger: true
		        });
		    }
		});
	},

	routes: {
		'' : 'stats',
		'statistiques(/)' : 'statistiques',
		'matchs(/)' : 'matchs',
		'paris(/)' : 'paris',
		'publications(/)' : 'publications',
		'promotions(/)' : 'promotions'
	},

	statistiques: function() {
		console.info('ROUTER -----> STATISTIQUES');

		this.loadView( new StatsView() );
	},

	matchs: function() {
		console.info('ROUTER -----> MATCHS');

		this.loadView( new MatchsView() );
	},

	paris: function() {
		console.info('ROUTER -----> PARIS');

		this.loadView( new ParisView() );
	},

	publications: function() {
		console.info('ROUTER -----> PUBLICATIONS');

		this.loadView( new PublicationsView() );
	},

	promotions: function() {
		console.info('ROUTER -----> PROMOTIONS');

		this.loadView( new PromotionsView() );
	},
	
	loadView : function(view) {
		this.view && this.view.remove();
		this.view = view;
		this.view.render();
	}
});