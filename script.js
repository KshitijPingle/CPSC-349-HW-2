// Kshitij Pingle
// CPSC 349
// HW 2
// 14/3/2025
// Friday


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
        let currentPageNum = json["page"]
        pageNumber = currentPageNum;
        let maxPages = json["total_pages"]
        const movies = json["results"]
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

    const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=${pageNumber}`;
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
        let currentPageNum = json["page"]
        pageNumber = currentPageNum;
        let maxPages = json["total_pages"]
        const movies = json["results"]
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
        if (document.getElementById("sort_by").value != "Sort-by") {
            // searchTerm = document.getElementById("sort_by").value;
            handleSorting();
        }
        else if (searchTerm == "") {
            loadTrendingPage();
        }
        else {
            handleSearch();
        }
    }
}

const nextPage = () => {
    pageNumber += 1;
    if (document.getElementById("sort_by").value != "Sort-by") {
        // searchTerm = document.getElementById("sort_by").value;
        handleSorting();
    }
    else if (searchTerm == "") {
        loadTrendingPage();
    }
    else {
        handleSearch();
    }
}


const handleSorting = () => {
    const sort_by = document.getElementById("sort_by").value;
    let url = "";
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTAwZmIxNGQzYTlmNmFhMTEwM2MzZGZjNjk4MzBhYyIsIm5iZiI6MTc0MTQ2Njg0NS4yNCwic3ViIjoiNjdjY2FjZGQ4MjMwYjI1NmY0ZjViODk4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.1dko7ViElFh_YUnW8Z3R8Zh3A-1LwUzbneJEPApdgdI'
        }
    };
    
    switch (sort_by) {
        case "Sort-by":
            // Load normal trending page
            url = `https://api.themoviedb.org/3/trending/all/week?language=en-US&page=${pageNumber}`;
            break;

        case "release-date-asc":
            url =  `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=primary_release_date.asc`            
            break;

        case "release-date-desc":
            url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=primary_release_date.desc`
            break;

        case "rating-asc":
            url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=vote_average.asc`  
            break;

        case "rating-desc":
            url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=vote_average.desc`
            break;

        default:
            // Load normal trending page
            url = `https://api.themoviedb.org/3/trending/all/week?language=en-US&page=${pageNumber}`;
            break;
    }

    fetch(url, options)
    .then(res => res.json())
    .then(json => {
      let currentPageNum = json["page"]
      pageNumber = currentPageNum;
      let maxPages = json["total_pages"]
      const movies = json["results"]
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


// When page initially loads up, call trending page
loadTrendingPage();