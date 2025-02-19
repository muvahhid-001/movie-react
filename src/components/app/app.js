import { Component } from "react";
import MovieList from "../movie-list/movie-list";
import { Offline, Online } from "react-detect-offline";
import { Alert } from "antd";
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
  };

  componentDidMount() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTc0MDk1YTQ5YWNjMjc1ODRmMTVhNzExOWEwNjQ5ZiIsIm5iZiI6MTczOTY1NDI2Mi44NDYwMDAyLCJzdWIiOiI2N2IxMDQ3NmFjMDg4YTQxNDU2YzU1N2EiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.gnVJJMRbg5IxGwgkj0MHQQbS5Zy_kbCIZKcR7-FIKc8",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options,
    )
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
            message: { error },
          },
        });
      });
  }

  render() {
    return (
      <main>
        <Header />
        <Online>
          <MovieList movies={this.state.movies} error={this.state.error} />
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
