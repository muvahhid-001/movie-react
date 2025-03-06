import { Component } from "react";
import { Offline, Online } from "react-detect-offline";
import { Pagination, Alert } from "antd";
import { debounce } from "lodash";
import MovieList from "../movie-list/movie-list";
import Header from "../header/header";
import { GhostSessionsProvider } from "../ghost-sessions/ghost-sessions-provider";
import SpinLoad from "../spin/spin";
import "./media.css";
import "./app.css";

class App extends Component {
  state = {
    movies: [],
    loading: false,
    error: { status: false, message: "" },
    activeTab: 1,
    pages: 1,
    inputTarget: "",
    session: null,
    ratedMovies: [],
    totalSearch: 0,
    totalRated: 0,
  };

  componentDidCatch(error, info) {
    this.setState({
      error: {
        status: true,
        message: error.toString(),
      },
    });
    console.error("Error caught:", error, info);
  }

  debounceTime = debounce((value) => {
    this.searchMovieName(value);
  }, 400);

  handleInputChange = (event) => {
    const { value } = event.target;
    if (this.state.error.status) {
      this.setState({ error: { status: false, message: "" } });
    }
    this.setState({ inputTarget: value });
    if (value.trim() === "") {
      this.debounceTime.cancel();
      this.getData(1);
      return;
    }
    this.setState({ loading: true });
    this.debounceTime(value);
  };

  mergeRatings = (movies) =>
    movies.map((movie) => {
      const rated = this.state.ratedMovies.find((m) => m.id === movie.id);
      return rated ? { ...movie, rating: rated.rating } : movie;
    });

  filterMovie = (result) => {
    if (result.results.length < 1) {
      return this.setState({
        error: {
          status: true,
          message:
            "Поиск не дал результатов, проверьте наличие ошибки в контексте.",
        },
      });
    }
    const searchRes = result.results.filter(
      (movie) =>
        movie.id &&
        movie.backdrop_path &&
        movie.original_title &&
        movie.overview &&
        movie.release_date &&
        movie.release_date !== "",
    );
    this.setState({
      movies: { results: this.mergeRatings(searchRes) },
      totalSearch: result.total_results,
    });
  };

  currentPage = (page) => {
    this.setState({ pages: page }, () => {
      if (this.state.activeTab === 1) {
        this.getData(page);
      } else {
        this.getRatedFilm(page);
      }
      const header = document.querySelector("header");
      if (header) {
        header.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.pages !== this.state.pages && this.state.activeTab === 1) {
      this.getData(this.state.pages);
      this.setState({ error: { status: false, message: "" } });
    }
  }

  componentDidMount() {
    const savedRatedMovies = JSON.parse(
      localStorage.getItem("ratedMovies") || "[]",
    );
    this.setState(
      { ratedMovies: savedRatedMovies, totalRated: savedRatedMovies.length },
      () => {
        this.getData(1);
      },
    );
    let sessionId = localStorage.getItem("id");
    if (!sessionId) {
      sessionId = Math.random().toString(36).substr(2, 9);
      localStorage.setItem("id", sessionId);
    }
    this.setState({ session: { guest_session_id: sessionId } });
  }

  addRating = (rating, movie) => {
    const ratedMovie = { ...movie, rating };
    this.setState((prevState) => {
      const ratedMovies = [...prevState.ratedMovies];
      const existingIndex = ratedMovies.findIndex((m) => m.id === movie.id);
      if (existingIndex !== -1) {
        ratedMovies[existingIndex] = ratedMovie;
      } else {
        ratedMovies.push(ratedMovie);
      }
      let updatedMovies = { ...prevState.movies };
      if (updatedMovies.results) {
        updatedMovies.results = updatedMovies.results.map((m) =>
          m.id === movie.id ? ratedMovie : m,
        );
      }
      localStorage.setItem("ratedMovies", JSON.stringify(ratedMovies));
      return {
        ratedMovies,
        movies: updatedMovies,
        totalRated: ratedMovies.length,
      };
    });
  };

  searchMovieName = async (target) => {
    const apiKey = "8a74095a49acc27584f15a7119a0649f";
    this.setState({ loading: true });
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${target}&language=en-US&page=1&api_key=${apiKey}`,
    );
    const result = await response.json();
    this.filterMovie(result);
    this.setState({ loading: false });
  };

  getData = (
    page,
    url = "https://api.themoviedb.org/3/movie/popular?api_key=8a74095a49acc27584f15a7119a0649f&language=en-US&page=",
  ) => {
    this.setState({ loading: true });
    fetch(`${url}${page}`, {
      method: "GET",
      headers: { accept: "application/json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        data.results = this.mergeRatings(data.results);
        this.setState({
          movies: data,
          loading: false,
          totalSearch: data.total_results,
        });
      })
      .catch((error) => {
        this.setState({
          error: { status: true, message: error.message },
          loading: false,
        });
      });
  };

  changeTab = (newTab) => {
    this.setState(
      {
        activeTab: newTab,
        pages: 1,
        error: { status: false, message: "" },
        inputTarget: "",
      },
      () => {
        if (newTab === 2) {
          this.getRatedFilm(1);
        } else {
          this.getData(1);
        }
      },
    );
  };

  getRatedFilm = (page) => {
    const perPage = 20;
    const { ratedMovies } = this.state;
    const totalRated = ratedMovies.length;
    if (totalRated === 0) {
      this.setState({
        movies: { results: [] },
        loading: false,
        totalRated,
        error: { status: true, message: "Нет фильмов" },
      });
      return;
    }
    const start = (page - 1) * perPage;
    const pagedMovies = ratedMovies.slice(start, start + perPage);
    this.setState({
      movies: { results: pagedMovies },
      loading: false,
      totalRated,
      error: { status: false, message: "" },
    });
  };

  render() {
    const pageSize = 20;
    const total =
      this.state.activeTab === 1
        ? Math.min(this.state.totalSearch, 400 * pageSize)
        : this.state.totalRated;
    return (
      <GhostSessionsProvider>
        <Header
          inputChange={this.handleInputChange}
          changeTab={this.changeTab}
          tabValue={this.state.activeTab}
        />
        <main>
          <Online>
            {this.state.loading === false ? (
              <MovieList
                movies={this.state.movies}
                error={this.state.error}
                addRating={this.addRating}
              />
            ) : (
              <SpinLoad />
            )}
            <Pagination
              current={this.state.pages}
              total={total}
              pageSize={20}
              onChange={this.currentPage}
            />
          </Online>
          <Offline>
            <Alert
              message="Error"
              description="Нет подключения к интернету!"
              type="error"
              showIcon
            />
          </Offline>
        </main>
      </GhostSessionsProvider>
    );
  }
}

export default App;
