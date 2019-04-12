import React, { Component } from 'react';
import './App.css';

const API_KEY = 'YOUR_API_KEY';

const callMovieDB = (route, params = {}) => {
  let url = 'https://api.themoviedb.org/3';
  url += route.startsWith('/') ? route : '/' + route;
  
  let esc = encodeURIComponent;
  let query = Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');
  if (query.length > 0) {
    query = '&' + query;
  }
  return fetch(`${url}?api_key=${API_KEY}${query}`)
    .then(response => response.json());
}

// returns array of strings - movie titles
const fetchMovieSuggestions = (query, limit = 5) => {
  return callMovieDB('/search/movie', {query, include_adult: false})
    .then(movies => {
      let list = movies.results;
      let suggestions = [];
      for (let i = 0; i < Math.min(limit, list.length); i++) {
        suggestions.push(list[i].title);
      }
      return suggestions;
    })
    .catch(err => {
      return [];
    });
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: [],
      query: ''
    };
  }

  onQueryChange = e => {
    let query = e.target.value;
    this.setState({ query });
  }

  onSubmit = e => {
    e.preventDefault();

    fetchMovieSuggestions(this.state.query)
      .then(suggestions => this.setState({ suggestions }));
  }

  render() {
    let { query, suggestions } = this.state;

    return (
      <div className="app">
        <header className="header">
          <h1 className="header__text">
            Movie Search
          </h1>
        </header>
        <form className="search" onSubmit={this.onSubmit}>
          <input className="search__input" autoFocus={true} 
            placeholder="Type to search movie title..." onChange={this.onQueryChange}
            value={query} list="suggestions" id="query" name="query"/>
          <datalist id="suggestions">
            {suggestions.map(val => 
              <option key={val} value={val}/>
            )}
          </datalist> 
        </form>
      </div>
    );
  }
}

export default App;
