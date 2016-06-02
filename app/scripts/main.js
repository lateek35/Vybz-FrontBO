'use strict';

var app  = {},
$        = require('jquery'),
Backbone = require('backbone'),
_        = require('lodash'),
Handlebars = require('handlebars');


var AppView = require('./app/app');

var Router = require('./app/router/main');

$(function () {
	'use strict';

	app.Router = new Router();

	app.AppView = new AppView();

});