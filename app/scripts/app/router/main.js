var $      = require('jquery'),
Backbone   = require('backbone'),
Handlebars = require('handlebars');


var StatsView = require('../views/pages/stats/main'),
	MatchsView = require('../views/pages/matchs/main'),
	MatchsDetailView = require('../views/pages/matchsDetail/main'),
	MatchsEditView = require('../views/pages/matchsEdit/main'),
	ParisView = require('../views/pages/paris/main'),
	PublicationsView = require('../views/pages/publications/main'),
	PromotionsView = require('../views/pages/promotions/main'),
	PlayersListView = require('../views/pages/playersList/main');


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
		'' : 'statistiques',
		'statistiques(/)' : 'statistiques',
		'matchs(/)' : 'matchs',
		'matchs/:id(/)' : 'matchsDetail',
		'matchs/:id(/)/edit' : 'matchsEdit',
		'paris(/)' : 'paris',
		'publications(/)' : 'publications',
		'promotions(/)' : 'promotions',
		'player(/)' : 'playersList',
	},

	statistiques: function() {
		console.info('ROUTER -----> STATISTIQUES');

		this.loadView( new StatsView() );
	},

	matchs: function() {
		console.info('ROUTER -----> MATCHS');

		this.loadView( new MatchsView() );
	},

	matchsDetail: function(id) {
		console.info('ROUTER -----> MATCHSDETAIL',id);

		this.loadView( new MatchsDetailView() );
	},

	matchsEdit: function(id) {
		console.info('ROUTER -----> MATCHSEDIT',id);

		this.loadView( new MatchsEditView() );
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

	playersList: function() {
		console.info('ROUTER -----> PLAYERSLIST');

		this.loadView( new PlayersListView() );
	},
	
	loadView : function(view) {
		this.view && this.view.remove();
		this.view = view;
		this.view.render();
	}
});