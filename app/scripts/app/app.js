"use strict";

var $      = require('jquery'),
Backbone   = require('backbone'),
Handlebars = require('handlebars');

var attachFastClick = require('fastclick'),
Header = require('../app/views/components/header/main.js'),
Menu = require('../app/views/components/menu/main.js'),
TeamsCollection = require('../app/collections/teams'),
PlayersCollection = require('../app/collections/players');

module.exports = Backbone.View.extend({
	
	header: null,
	players: null,
	teams: null,
	ownPlayers: null,
	ownTeam: null,

	events: {

	},

	initialize: function( options ){
		attachFastClick(document.body);
		this.header = new Header();
		this.menu = new Menu();
		this.fetchPlayer();
		this.EA = options.EA;
		this.EA.reqres.setHandler("get:ownteam", function(){
		  	return this.ownTeam;
		}.bind(this));

	},

	fetchPlayer: function(){
		this.players = new PlayersCollection();
		this.players.fetch();
		this.players.on('sync', this.fetchTeam.bind(this) );
	},

	fetchTeam: function(){
		this.teams = new TeamsCollection();
		this.teams.fetch();
		this.teams.on('sync', this.addPlayersToTeam.bind(this) );
	},

	addPlayersToTeam: function(){
		this.ownTeam = this.teams.at(this.teams.length - 1)
		var ids = this.ownTeam.get('players-list');
		this.ownPlayers = new PlayersCollection();
		_.each(ids, function(id){
			this.ownPlayers.push(this.players.at(id));
		}.bind(this))
		this.ownTeam.set({ players: this.ownPlayers});
	},

	render: function(){
		console.log('Render');
	}
});