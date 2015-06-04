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

	function checkID (watchListArray, title) {
		var present = false;
		for(var j = 0; j < watchListArray.length; j++) {
			if(watchListArray[j].Title == title) {
				present = true;
				break;
			}
		}
		return present;
	}

	var searchList = _.template($('#list-template').html());
	var watchMovies = _.template($('#watch-template').html());


	$('.search-form').submit(function(e) {
		e.preventDefault();
		var findMovie = $(e.target).find('.search-box').val();
		thisApp.navigate('results/' + findMovie, {trigger: true});

		function getMovie (movie) {
			$('#list').empty();
			for(var i = 0; i < movie.Search.length; i++) {
				var alreadyChecked = checkID(myWatchList, movie.Search[i].Title);
				movie.Search[i].opacity = '';
				
				if(alreadyChecked) {
					movie.Search[i].opacity = ' style="opacity:0.5"';
				}

				movie.Search[i].pos = i;
				var listRow = searchList(movie.Search[i]);
				console.log(listRow);
				$('#list').append(listRow);
			}

			$('#list').fadeIn(1000);


			$('li').click(function(e) {
				$(this).css('opacity', '0.5');

				var thisPosition = $(this).data('position');
				var onList = checkID(myWatchList, movie.Search[thisPosition].Title);
				
				if(!onList) {
					myWatchList.push(movie.Search[thisPosition]);
					console.log(myWatchList);
					var myWatch = watchMovies(movie.Search[thisPosition]);
					$('#movie-time').append(myWatch);
					$('#watch').fadeIn(1000);
				}
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