import React, { Component } from 'react';
import './App.css';

class App extends Component {
  onSubmit = e => {
    e.preventDefault();
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <h1 className="header__text">
            Movie Search
          </h1>
        </header>
        <form className="search-form" onSubmit={this.onSubmit}>
          <input type="search" placeholder="Search movie title..." className="search-form__input"/>
        </form>
      </div>
    );
  }
}

export default App;
