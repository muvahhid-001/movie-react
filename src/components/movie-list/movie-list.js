import MovieItems from "../movie-items/movie-items";
import "./movie-list.css";

const MovieList = ({ movies }) => {
  if (!movies || !movies.results) {
    return <p>Loading...</p>;
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
