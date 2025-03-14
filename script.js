// const apiKey = "d500fb14d3a9f6aa1103c3dfc69830ac";
// const apiReadAccessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTAwZmIxNGQzYTlmNmFhMTEwM2MzZGZjNjk4MzBhYyIsIm5iZiI6MTc0MTQ2Njg0NS4yNCwic3ViIjoiNjdjY2FjZGQ4MjMwYjI1NmY0ZjViODk4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.1dko7ViElFh_YUnW8Z3R8Zh3A-1LwUzbneJEPApdgdI";

let searchTerm = "";
let pageNumber = 1;

const loadTrendingPage = () => {
    let url = `https://api.themoviedb.org/3/trending/all/week?language=en-US&page=${pageNumber}`;
    let options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTAwZmIxNGQzYTlmNmFhMTEwM2MzZGZjNjk4MzBhYyIsIm5iZiI6MTc0MTQ2Njg0NS4yNCwic3ViIjoiNjdjY2FjZGQ4MjMwYjI1NmY0ZjViODk4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.1dko7ViElFh_YUnW8Z3R8Zh3A-1LwUzbneJEPApdgdI'
      }
    };
    
    // Load initial trending page
    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        console.log(json)
        let currentPageNum = json["page"]
        pageNumber = currentPageNum;
        let maxPages = json["total_pages"]
        const movies = json["results"]
        console.log(movies)
        let numberOfMovies = movies.length;

        // Empty contents of grid
        document.getElementById('movie_grid').innerHTML =  ``
    
        for (let i = 0; i < numberOfMovies; i++){
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

            // Now make each movie card by attaching every element required
            document.getElementById('movie_grid').innerHTML += `
            <div class="movie_card">
                <img src=${moviePosterUrl} alt="Movie Poster">
                <h1>${movieTitle}</h1>
                <p>Release Date: ${releaseDate}</p>
                <p>Rating: ${movieRating}</p>
            </div>`
    
        }
    
        // Update page number
        document.getElementById("page_controls_p").innerHTML = 
        `Page ${currentPageNum} of ${maxPages}`
    
      })
      .catch(err => console.error(err));
};

const handleSearch = () => {
    searchTerm = document.getElementById("search_bar").value
    console.log(searchTerm)

    const url = `https://api.themoviedb.org/3/search/movie?include_adult=true&language=en-US&page=${pageNumber}`;
    const searchUrl =  `${url}&query=${searchTerm}"`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTAwZmIxNGQzYTlmNmFhMTEwM2MzZGZjNjk4MzBhYyIsIm5iZiI6MTc0MTQ2Njg0NS4yNCwic3ViIjoiNjdjY2FjZGQ4MjMwYjI1NmY0ZjViODk4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.1dko7ViElFh_YUnW8Z3R8Zh3A-1LwUzbneJEPApdgdI'
      }
    };
    
    fetch(searchUrl, options)
      .then(res => res.json())
      .then(json => {
        console.log(json)
        let currentPageNum = json["page"]
        pageNumber = currentPageNum;
        let maxPages = json["total_pages"]
        const movies = json["results"]
        console.log(movies)
        let numberOfMovies = movies.length;

        // Empty contents of grid
        document.getElementById('movie_grid').innerHTML =  ``
    
        for (let i = 0; i < numberOfMovies; i++){
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

            // Now make each movie card by attaching every element required
            document.getElementById('movie_grid').innerHTML += `
            <div class="movie_card">
                <img src=${moviePosterUrl} alt="Movie Poster">
                <h1>${movieTitle}</h1>
                <p>Release Date: ${releaseDate}</p>
                <p>Rating: ${movieRating}</p>
            </div>`
    
        }
    
        // Update page number
        document.getElementById("page_controls_p").innerHTML = 
        `Page ${currentPageNum} of ${maxPages}`
    
      })
      .catch(err => console.error(err));
}


const prevPage = () => {
    if (pageNumber == 1) {
        // Do nothing
    }
    else {
        pageNumber = pageNumber - 1;
        if (searchTerm == "") {
            loadTrendingPage();
        }
        else {
            handleSearch();
        }
    }
}

const nextPage = () => {
    pageNumber += 1;
    if (searchTerm == "") {
        loadTrendingPage();
    }
    else {
        handleSearch();
    }
}


if (searchTerm == "") {
    loadTrendingPage();
}

