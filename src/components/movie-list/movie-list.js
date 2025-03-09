import MovieItems from "../movie-items/movie-items";
import PropTypes from "prop-types";
import SpinLoad from "../spin/spin";
import { Alert } from "antd";
import "./movie-list.css";

const MovieList = ({
  movies = [],
  error = {},
  addRating = () => {},
  activeTab = 1,
}) => {
  if (error.status)
    return (
      <Alert
        message="Error"
        description={error.message}
        type="error"
        showIcon
      />
    );
  if (!movies || !movies.results) return <SpinLoad />;
  return (
    <ul className="movie_list">
      {movies.results.map((movie) => (
        <MovieItems
          key={movie.id}
          movie={movie}
          addRating={addRating}
          activeTab={activeTab}
        />
      ))}
    </ul>
  );
};

MovieList.propTypes = {
  movies: PropTypes.shape({
    results: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        backdrop_path: PropTypes.string,
        original_title: PropTypes.string.isRequired,
        overview: PropTypes.string,
        release_date: PropTypes.string,
        rating: PropTypes.number,
        genre_ids: PropTypes.arrayOf(PropTypes.number),
        vote_average: PropTypes.number,
      }),
    ),
  }),
  error: PropTypes.shape({
    status: PropTypes.bool,
    message: PropTypes.string,
  }),
  addRating: PropTypes.func,
  activeTab: PropTypes.number,
};

export default MovieList;
