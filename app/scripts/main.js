'use strict';

var app  = {},
$        = require('jquery'),
Backbone = require('backbone'),
_        = require('lodash'),
BackboneWreqr = require('Backbone.Wreqr'),
Handlebars = require('handlebars');


var AppView = require('./app/app');

var Router = require('./app/router/main');

$(function () {
	'use strict';

	var EA = {
		vent : new BackboneWreqr.EventAggregator(),
		commands : new BackboneWreqr.Commands(),
		reqres : new Backbone.Wreqr.RequestResponse()
	}

	app.AppView = new AppView({ EA : EA });
	
	app.Router = new Router({ EA : EA });


});