$(document).ready(function() {

	var App = Backbone.Router.extend({
		routes: {
			'': 'main',
			'home': 'main',
			'results/:query': 'results',
			'watch': 'watchList',
			'*notFound': 'main'
		},
		main: function() {
			$('section').hide();
			$('#search-page').show();
		},
		results: function(query) {
			$('section').hide();
			$('#result-page').show();
		},
		watchList: function() {
			$('section').hide();
			$('#toWatch').show();
		}
	});

	var thisApp = new App();
	Backbone.history.start();

	var myWatchList = [];
	var toWatch = {};

	function checkID (watchListArray, imdbID) {
		var present = false;
		for(var j = 0; j < watchListArray.length; j++) {
			if(watchListArray[j].imdbID == imdbID) {
				present = true;
				break;
			}
		}
		return present;
	}

	$('.search-form').submit(function(e) {
		e.preventDefault();
		var findMovie = $(e.target).find('.search-box').val();
		thisApp.navigate('results/' + findMovie, {trigger: true});

		function getMovie (movie) {
			var movieList = '';
			for(var i = 0; i < movie.Search.length; i++) {
				var movies = [];
				var alreadyChecked = checkID (myWatchList, movie.Search[i].imdbID);
				var opacity = '';

				if(alreadyChecked) {
					opacity = ' style="opacity:0.5"';
				}
				for(var prop in movie.Search[i]) {

					movies.push(' ' + prop + ': ' + movie.Search[i][prop]);
				}
				movies = movies.toString();
				movieList += '<li data-position ="' + i + '"' + opacity + '>' + movies + '</li>';
			}
		
			$('#list').html(movieList);
			$('#list').fadeIn(1000);

			$('li').click(function(e) {
				$(this).css('opacity', '0.5');

				var thisPosition = $(this).data('position');
				var onList = checkID (myWatchList, movie.Search[thisPosition].imdbID);
				
				if(!onList) {
					myWatchList.push(movie.Search[thisPosition]);
				}
			console.log(myWatchList);	
			});	
		};

		$.get(
			'http://www.omdbapi.com/',
			{
				s: findMovie
			},
			getMovie,
			'json'
		);

	});
})