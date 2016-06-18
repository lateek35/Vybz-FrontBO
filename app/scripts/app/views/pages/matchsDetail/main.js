var $      = require('jquery'),
Handlebars = require('handlebars'),
Backbone   = require('backbone'),
template   = require('./template.hbs'),
Pikaday = require('pikaday'),
gsap       = require('gsap');


module.exports = Backbone.View.extend({

	el: '#content',

	events:{
		'click .remove-player' : 'clickRemovePlayer'
	},

	initialize: function(){

	},
	onRender: function(){

		//Set picker date
		this.picker = new Pikaday({ 
			field: document.getElementById('datepicker'),
			format: 'D MMM YYYY',
			i18n: {
			    previousMonth : 'Mois précédent',
			    nextMonth     : 'Mois suivant',
			    months        : ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre'],
			    weekdays      : ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
			    weekdaysShort : ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam']
			}
		});
	},

	clickRemovePlayer: function(e){
		var target = $(e.currentTarget).closest('.player');
		var item = target.clone();
		target.remove();
		item.css({ 'position': 'inherit'});
		item.wrap('<li class="li-player" draggable="true"></li>');
		$('.player-choice').append(item.parent().css({ 'position': 'inherit'}));
	},

	allowDrop: function(ev) {
	    ev.preventDefault();
	},

	drag: function(ev) {
	    ev.dataTransfer.setData("text", ev.target.id);
	},

	drop: function(ev) {
	    ev.preventDefault();
	    // var data = ev.dataTransfer.html();
	    // ev.target.appendChild(document.getElementById(data));
	},

	bindEvent: function(){
		// $('.li-player').on({
	 //        // on commence le drag
	 //        dragstart: function(e) {
	 //            $this = $(e.currentTarget);
	 //            this.dragged = $this;
	 //            $this.css('opacity', '0.5');
	 //        }.bind(this),

	 //        dragover: function(e) {
	 //            e.preventDefault();
	 //        },

	 //        dragend: function(e) {
	 //            $(this).css('opacity', '1');
	 //        }
	 //    });

	    $('body').on('dragstart','.li-player', function(e) {
            $this = $(e.currentTarget);
            this.dragged = $this;
            $this.css('opacity', '0.5');
	    }.bind(this));

	    $('body').on('dragover','.li-player', function(e) {
	        e.preventDefault();
	    });

	    $('body').on('dragend','.li-player', function(e) {
	        $(this).css('opacity', '1');
	    });

	    $('.play-ground .player').on({
	    	// on commence le drag
	        dragstart: function(e) {
	            $this = $(e.currentTarget);
	            this.dragged = $this;
	            $this.css('opacity', '0.5');
	        }.bind(this),

	        dragover: function(e) {
	            e.preventDefault();
	        },

	        dragend: function(e) {
	            $(this).css('opacity', '1');
	        }
	    });

	    $('.fixPadding').on({
	    	drop :function(e){
		    	var clone = this.dragged.clone();
		    	var elm = clone.find('.player');
				$(e.currentTarget).append(elm.css({ position: 'relative' }));
				$(this.dragged).remove();
			}.bind(this),

			dragover: function(e){
	    		e.preventDefault();
			}
	    });

	    $('.play-ground').on({
	    	drop :function(e){
		    	var clone = this.dragged.clone();
		    	var elm = clone.find('.player');

		    	//set position
		    	var w = e.offsetX / $(e.currentTarget).width() * 100;
		    	var h = e.offsetY / $(e.currentTarget).innerHeight() * 100;
		    	elm.css({left: w+'%', top: h+'%', position: 'absolute'});
				$(e.currentTarget).append(elm);
				$(this.dragged).remove();
			}.bind(this),

			dragover: function(e){
	    		e.preventDefault();
			}
	    });
	},

	unbindEvents: function(){

	},

	render: function(){
		this.$el.html( template({tpl : 'MATCH DETAIL'}) );
		this.bindEvent();
		this.onRender();
	},

	remove: function(){
		this.$el.empty(); /* off to unbind the events */
		this.undelegateEvents();
      	this.stopListening();
      	return this;
	}
});