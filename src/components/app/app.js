import { Component } from "react";
import MovieList from "../movie-list/movie-list";
import { Offline, Online } from "react-detect-offline";
import { Pagination } from "antd";
import { Alert } from "antd";
import { debounce } from "lodash";
import Header from "../header/header";

import "./media.css";
import "./app.css";

export default class App extends Component {
  state = {
    movies: [],
    error: {
      status: false,
      message: "",
    },
    pages: 1,
    inputTarget: "",
  };

  debounceTime = debounce((value) => {
    this.searchMovieName(value);
  }, 400);

  handleInputChange = (event) => {
    if (this.state.error.status) {
      this.setState({
        error: {
          status: false,
          message: "",
        },
      });
    }
    const { value } = event.target;
    this.setState({
      inputTarget: value,
    });
    this.debounceTime(value);
  };

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
        movie.release_date != null &&
        movie.release_date !== "",
    );
    this.setState({
      movies: {
        results: searchRes,
      },
    });
  };

  currentPage = (page) => {
    this.setState({
      pages: page,
    });
    const header = document.querySelector("main");
    if (header) {
      header.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.pages !== this.state.pages) {
      this.getData(this.state.pages);
      this.setState({
        error: {
          status: false,
        },
      });
    }
  }

  componentDidMount() {
    this.getData(this.state.pages);
  }

  searchMovieName = async (target) => {
    const apiKey = "8a74095a49acc27584f15a7119a0649f";

    async function fetchFn() {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${target}&language=en-US&page=1&api_key=${apiKey}`,
      );
      const result = await response.json();
      return result;
    }

    const result = await fetchFn();
    this.filterMovie(result);
  };

  getData = (
    page,
    url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=",
  ) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTc0MDk1YTQ5YWNjMjc1ODRmMTVhNzExOWEwNjQ5ZiIsIm5iZiI6MTczOTY1NDI2Mi44NDYwMDAyLCJzdWIiOiI2N2IxMDQ3NmFjMDg4YTQxNDU2YzU1N2EiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.gnVJJMRbg5IxGwgkj0MHQQbS5Zy_kbCIZKcR7-FIKc8",
      },
    };

    fetch(`${url}${page}`, options)
      .then((response) => {
        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        this.setState({
          movies: data,
        });
      })
      .catch((error) => {
        this.setState({
          error: {
            status: true,
            message: error.message,
          },
        });
      });
  };

  render() {
    return (
      <main>
        <Header inputChange={this.handleInputChange} />
        <Online>
          <MovieList movies={this.state.movies} error={this.state.error} />
          <Pagination
            current={this.state.pages}
            total={500}
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
    );
  }
}
