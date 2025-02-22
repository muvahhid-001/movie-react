import { format, parseISO } from "date-fns";
import "./movie-items.css";

const MovieItems = ({ movie }) => {
  const { id, backdrop_path, original_title, overview, release_date } = movie;

  return (
    <li className="movie_items" key={id}>
      <div className="items_div">
        <img
          src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
          alt={original_title}
          className="movie_img"
        />
        <div className="movie_info">
          <h2 className="movie_title">{original_title}</h2>
          <p className="movie_date">
            {format(parseISO(release_date), "MMMM dd, yyyy")}
          </p>
          <ul className="movie_genres">
            <li className="movie_genre">Action</li>
            <li className="movie_genre">Drama</li>
          </ul>
          <p className="movie_p">{overview}</p>
        </div>
      </div>
    </li>
  );
};

export default MovieItems;
