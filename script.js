// To-Do

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
  .then(json => console.log(json))
  .catch(err => console.error(err));