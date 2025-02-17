import MovieItems from "../movie-items/movie-items";
import "./movie-list.css";

const MovieList = ({ movies }) => {
  if (!movies || !movies.results) {
    return (
      <div className="loading_div">
        <p className="loading">Loading...</p>
        <p className="loading_warn">Maybe: Vpn no connect!</p>
      </div>
    );
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
