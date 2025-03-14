// const apiKey = "d500fb14d3a9f6aa1103c3dfc69830ac";
// const apiReadAccessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTAwZmIxNGQzYTlmNmFhMTEwM2MzZGZjNjk4MzBhYyIsIm5iZiI6MTc0MTQ2Njg0NS4yNCwic3ViIjoiNjdjY2FjZGQ4MjMwYjI1NmY0ZjViODk4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.1dko7ViElFh_YUnW8Z3R8Zh3A-1LwUzbneJEPApdgdI";


let url = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';
let options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTAwZmIxNGQzYTlmNmFhMTEwM2MzZGZjNjk4MzBhYyIsIm5iZiI6MTc0MTQ2Njg0NS4yNCwic3ViIjoiNjdjY2FjZGQ4MjMwYjI1NmY0ZjViODk4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.1dko7ViElFh_YUnW8Z3R8Zh3A-1LwUzbneJEPApdgdI'
  }
};

let searchTerm = "";

// Load initial trending page
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
            // Poster Image - DONE
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
        let moviePosterUrl = "http://image.tmdb.org/t/p/w185" + posterPath
        console.log(moviePosterUrl)

        // Now make each movie card by attaching every element required
        document.getElementById('movie_grid').innerHTML += `
        <div>
            <img src=${moviePosterUrl} alt="Movie Poster">
            <h1>${movieTitle}</h1>
            <p>Release Date: ${releaseDate}</p>
            <p>Rating: ${movieRating}</p>
        </div>`
    }

  })
  .catch(err => console.error(err));


const handleSearch = (e) => {
    searchTerm = e.target.value;
}
