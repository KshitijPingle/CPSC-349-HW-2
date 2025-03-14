// const apiKey = "d500fb14d3a9f6aa1103c3dfc69830ac";
// const apiReadAccessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTAwZmIxNGQzYTlmNmFhMTEwM2MzZGZjNjk4MzBhYyIsIm5iZiI6MTc0MTQ2Njg0NS4yNCwic3ViIjoiNjdjY2FjZGQ4MjMwYjI1NmY0ZjViODk4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.1dko7ViElFh_YUnW8Z3R8Zh3A-1LwUzbneJEPApdgdI";


const url = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTAwZmIxNGQzYTlmNmFhMTEwM2MzZGZjNjk4MzBhYyIsIm5iZiI6MTc0MTQ2Njg0NS4yNCwic3ViIjoiNjdjY2FjZGQ4MjMwYjI1NmY0ZjViODk4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.1dko7ViElFh_YUnW8Z3R8Zh3A-1LwUzbneJEPApdgdI'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => {
    console.log(json)
    let currentPageNum = json["page"]
    const movies = json["results"]
    console.log(movies)
    let numberOfMovies = movies.length;
    for (let i = 0; i < numberOfMovies; i++){
        // Get the following for each movie
            // Movie title - DONE
            // Poster Image
            // Release Date - DONE
            // Rating - DONE

        let movieTitle = movies[i]["title"]
        if (movieTitle == undefined) {
            movieTitle = movies[i]["name"]
        }
        let releaseDate = movies[i]["first_air_date"]
        if (releaseDate == undefined) {
            releaseDate = movies[i]["release_date"]
        }
        let movieRating = movies[i]["vote_average"]
        let posterPath = movies[i]["poster_path"]
        let moviePoster = "https://api.themoviedb.org/3" + posterPath
        console.log(moviePoster)
        let movieImg = document.createElement('img')
        movieImg.src = moviePoster

        // Now make each movie card by attaching every element required
        document.getElementById('movie_grid').innerHTML += `
        <div>
            <img src=movieImg alt="Movie Poster">
            <h1>${movieTitle}</h1>
            <p>Release Date: ${releaseDate}</p>
            <p>Rating: ${movieRating}</p>
        </div>`
    }

  })
  .catch(err => console.error(err));





// document.getElementById('movie_grid').innerHTML += `<p>${response.json()}</p>`