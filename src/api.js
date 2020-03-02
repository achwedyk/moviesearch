import { API_KEY } from './config'

const encodeParams = (params = {}) => {
  let esc = encodeURIComponent;
  return Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');
}

const callMovieDB = (route, params = {}) => {
  let url = 'https://api.themoviedb.org/3';
  url += route.startsWith('/') ? route : '/' + route;

  let fullUrl = `${url}?api_key=${API_KEY}`;
  let query = encodeParams(params);
  if (query.length > 0) {
    fullUrl += '&' + query;
  }

  return fetch(fullUrl)
    .then(response => response.json());
}

const compareByPopularity = (left, right) => {
  const a = left.popularity;
  const b = right.popularity;
  return a > b ? -1 : a < b ? 1 : 0;
}

export const orderByPopularity = list => {
  return list.sort(compareByPopularity);
}

// returns array of objects with the structure as defined in
// https://developers.themoviedb.org/3/getting-started/search-and-query-for-details
export const fetchMovieSuggestions = (query, limit = 5) => {
  return callMovieDB('/search/movie', {query, include_adult: false})
    .then(movies => {
      let ordered = orderByPopularity(movies.result);
      return ordered.slice(0, limit);
    })
    .catch(err => {
      console.error(err);
      return [];
    });
};