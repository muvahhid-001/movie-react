import MovieItems from "../movie-items/movie-items";
import SpinLoad from "../spin/spin";
import { Alert } from "antd";
import "./movie-list.css";

const MovieList = ({ movies, error }) => {
  console.log(movies);

  if (error.status) {
    return (
      <Alert
        message="Error"
        description={error.message}
        type="error"
        showIcon
      />
    );
  }
  if (!movies || !movies.results) {
    return <SpinLoad />;
  }
  return (
    <ul className="movie_list">
      {movies.results.map((movie) => (
        <MovieItems key={movie.id} movie={movie} />
      ))}
    </ul>
  );
};

export default MovieList;
