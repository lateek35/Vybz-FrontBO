var $      = require('jquery'),
Handlebars = require('handlebars'),
Backbone   = require('backbone'),
template   = require('./template.hbs');

var Chart = require('chart.js');

module.exports = Backbone.View.extend({

	el: '#content',

	initialize: function(){
		this.bindEvent();
	},

	bindEvent: function(){

	},

	unbindEvents: function(){

	},

	createCharts: function(){
		//Create the line chart
		var ctx = $("#myLineChart");
		new Chart(ctx, {
		    type: 'line',
		    label: '',
		    fill: false,
		    data: {
		        labels: ['OCT 2016', 'NOV 2016', 'DÉC 2016', 'JAN 2016', 'FEV 2016', 'MAR 2016', 'AVR 2016', 'MAI 2016', 'JUIN 2016'],
		        datasets: [{
		        	lineTension: .4,
		            data: [5, 15, 18, 15, 7, 17, 24, 16, 4, 15],
		            backgroundColor: 'rgba(0,122,53,0.1)',
		            borderColor: 'rgba(0,122,53,1)',
		            borderWidth: 1,
		    		pointBackgroundColor: '#FFF',
		    		pointRadius: 5,
		        }],
		    },
		    options: {
		    	hover: 'dataset',
		    	maintainAspectRatio: false,
		    	responsive: true,
		    	legend: {
                    display: false,
                },
		    	hover: {
		            // Overrides the global setting
		            mode: 'single'
		        },
		        scales: {
		            yAxes: [{
					    gridLines: {
					    	display: false
					    },
		                ticks: {
		                    beginAtZero:true
		                }
		            }],
		            xAxes: [{
					    gridLines: {
					    	display: false
					    },
		                ticks: {
		                    beginAtZero:true
		                }
		            }],
		        }
		    }
		});

		// Hook into main event handler
		var parentEventHandler = Chart.Controller.prototype.eventHandler;
		Chart.Controller.prototype.eventHandler = function() {
		    var ret = parentEventHandler.apply(this, arguments);
		    // Draw the vertical line here
		    var eventPosition = Chart.helpers.getRelativePosition(arguments[0], this.chart);
		    this.clear();
			this.draw();
		    this.chart.ctx.beginPath();
		    this.chart.ctx.moveTo(eventPosition.x, 0);
		    this.chart.ctx.strokeStyle = "#ff0000";
		    this.chart.ctx.lineTo(eventPosition.x, this.chart.ctx.canvas.height/2 - 27);
		    this.chart.ctx.stroke();

		    return ret;
		};



		//Create the pie chart
		// For a pie chart
		var ctx = $("#myPieChart");
		new Chart(ctx,{
		    type: 'pie',
		    data: {
			    labels: [
			        "4h - 8h",
			        "8h - 12h",
			        "12h - 16h",
			        "16h - 20h",
			        "20h - 00h",
			        "0h - 4h",
			    ],
			    datasets: [
			        {
			            data: [25, 8, 17, 25, 12.5,12.5],
			            borderWidth: 0,
			            backgroundColor: [
			                "#9fd8e0",
			                "#004e7a",
			                "#8090f3",
			                "#f3cc80",
			                "#fb6969",
			                "#007a35",
			            ],
			            hoverBackgroundColor: [
			                "#9fd8e0",
			                "#004e7a",
			                "#8090f3",
			                "#f3cc80",
			                "#fb6969",
			                "#007a35",
			            ]
			        }]
			},
		    options: {
		    	maintainAspectRatio: false,
		    	responsive: true,
		    	legend: {
                    display: false,
                }
			}
		});
	},

	render: function(){
		this.$el.html( template({tpl : 'STATISTIQUE'}) );
		this.createCharts();
	},
	
	remove: function(){
		this.$el.empty(); /* off to unbind the events */
		this.undelegateEvents();
      	this.stopListening();
      	return this;
	}
});