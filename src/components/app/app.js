import { Component } from "react";
import MovieList from "../movie-list/movie-list";
import FetchApi from "../fetch-api/fetch-api";
import Header from "../header/header";

import "./app.css";

export default class App extends Component {
  state = {
    movies: [],
    error: {
      status: false,
      message: "",
    },
  };

  componentDidMount() {
    <FetchApi />;
  }

  render() {
    return (
      <main>
        <Header />
        <MovieList movies={this.state.movies} error={this.state.error} />
      </main>
    );
  }
}
