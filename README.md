# IMDB App
Used the unofficial IMDB API to create an app that keep track of the movies that you want to watch 
###Learned Objectives
- Understand how to use a router to update URL hash
- Understand how to use GET requests to query an API
- Understand how to use a constructor
###Details
The IMDB API with two pages:

1. A home page (/) with a search bar, search button and description of the app. Upon searching for a movie it updates the URL and take you to the next page.

2. A search results page (/search/:query) that displays a list of movies based on the made search. This page makes a GET request to the IMDB API and display those movies on the page.

When you click on any of the movies in your search results it adds that movie to an object, and adds that object to an array that keeps track of all the movies you have clicked on.

When you click on a movie on the search results page, its opacity reduces by 50% to indicate that it is on your watch list. If you do another search and that movie appears in the results it shows up with an opacity of 50% in the results again.
