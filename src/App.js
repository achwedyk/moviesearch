import React, { Component } from 'react';
import './App.css';

import { fetchMovieSuggestions } from './api'

const MovieItem = ({ title, overview, release_date, poster_path }) => (
  <section className="movie">
    <h2 className="movie__title">{title}</h2>
    <div className="movie__overview">{overview}</div>
    {poster_path && (
      <img src={`http://image.tmdb.org/t/p/w185/${poster_path}`} alt="Movie poster" className="movie__poster"/>
    )}
    <div className="movie__release">Release date: {release_date}</div>
  </section>
)

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      suggestions: [],
      selected: null
    };
  }

  onQueryChange = e => {
    let query = e.target.value;
    this.setState({ query });
  }

  onInput = e => {
    const { suggestions } = this.state;
    const { value } = e.nativeEvent.target;

    const selected = suggestions.find(sug => sug.title === value)

    this.setState({ selected });
  }

  onSubmit = e => {
    e.preventDefault();

    fetchMovieSuggestions(this.state.query)
      .then(suggestions => {
        this.setState({ suggestions });
      });
  }

  render() {
    let { query, suggestions, selected } = this.state;

    return (
      <div className="app">
        <header className="header">
          <h1 className="header__text">
            Movie Search
          </h1>
        </header>
        <form className="search" onSubmit={this.onSubmit}>
          <input className="search__input" autoFocus={true}
            placeholder="Type to search movie title..."
            onChange={this.onQueryChange} onInput={this.onInput}
            value={query} list="suggestions" id="query" name="query"/>
          <datalist id="suggestions">
            {suggestions.map(({ id, title }) =>
              <option key={id} value={title}/>
            )}
          </datalist>
        </form>
        {selected && (
          <MovieItem {...selected}/>
        )}
      </div>
    );
  }
}

export default App;
