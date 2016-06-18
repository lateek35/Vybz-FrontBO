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
	PlayersListView = require('../views/pages/playersList/main'),
	PlayerSingleView = require('../views/pages/playerSingle/main'),
	PublicitesView = require('../views/pages/publicites/main');


module.exports = Backbone.Router.extend({

	initialize: function(options){
		this.EA = options.EA;
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
		'publicites(/)' : 'publicites',
		'player(/)' : 'playersList',
		'player/:id' : 'playerSingle',
	},

	statistiques: function() {
		console.info('ROUTER -----> STATISTIQUES');

		this.loadView( new StatsView({ EA: this.EA }) );
	},

	matchs: function() {
		console.info('ROUTER -----> MATCHS');

		this.loadView( new MatchsView({ EA: this.EA }) );
	},

	matchsDetail: function(id) {
		console.info('ROUTER -----> MATCHSDETAIL',id);

		this.loadView( new MatchsDetailView({ EA: this.EA }) );
	},

	matchsEdit: function(id) {
		console.info('ROUTER -----> MATCHSEDIT',id);

		this.loadView( new MatchsEditView({ EA: this.EA }) );
	},

	paris: function() {
		console.info('ROUTER -----> PARIS');

		this.loadView( new ParisView({ EA: this.EA }) );
	},

	publications: function() {
		console.info('ROUTER -----> PUBLICATIONS');

		this.loadView( new PublicationsView({ EA: this.EA }) );
	},

	promotions: function() {
		console.info('ROUTER -----> PROMOTIONS');

		this.loadView( new PromotionsView({ EA: this.EA }) );
	},

	publicites: function() {
		console.info('ROUTER -----> PUBLICITES');

		this.loadView( new PublicitesView({ EA: this.EA }) );
	},

	playersList: function() {
		console.info('ROUTER -----> PLAYERSLIST');

		this.loadView( new PlayersListView({ EA: this.EA }) );
	},

	playerSingle: function(){
		console.info('ROUTER -----> PLAYERSINGLE');

		this.loadView( new PlayerSingleView({ EA: this.EA }) );
	},
	
	loadView : function(view) {
		this.view && this.view.remove();
		this.view = view;
		this.view.render();
	}
});