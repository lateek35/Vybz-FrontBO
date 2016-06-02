var $      = require('jquery'),
Backbone   = require('backbone'),
Handlebars = require('handlebars');


var HomeView = require('../views/pages/home/main');


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
		'' : 'home'
	},

	home: function() {
		console.info('ROUTER -----> HOME');
		this.loadView( new HomeView() );
	},
	
	loadView : function(view) {
		this.view && this.view.remove();
		this.view = view;
	}
});