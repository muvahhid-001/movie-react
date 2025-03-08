import { format, parseISO, isValid } from "date-fns";
import { Rate } from "antd";
import { GhostSessions } from "../ghost-sessions/ghost-sessions-provider";
import "./movie-items.css";

const ifRating = (rating) => {
  if (rating <= 3) return "#E90000";
  if (rating <= 5) return "#E97E00";
  if (rating <= 7) return "#E9D100";
  return "#66E900";
};

const MovieItems = ({ movie = [], addRating = () => {} }) => {
  const {
    id,
    backdrop_path,
    original_title,
    overview,
    release_date,
    rating,
    genre_ids,
    vote_average,
  } = movie;

  const genre = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  const circleStyle = {
    border: `4px solid ${ifRating(vote_average)}`,
  };

  const formattedDate =
    release_date && isValid(parseISO(release_date))
      ? format(parseISO(release_date), "MMMM dd, yyyy")
      : "Дата неизвестна";

  return (
    <li className="movie_items" key={id}>
      <div className="movie_circle" style={circleStyle}>
        {vote_average.toFixed(1)}
      </div>
      <div className="items_div">
        <img
          src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
          alt={original_title}
          className="movie_img"
        />
        <div className="movie_info">
          <h2 className="movie_title">{original_title}</h2>
          <p className="movie_date">{formattedDate}</p>
          <ul className="movie_genres">
            {genre_ids.slice(0, 3).map((id) =>
              genre[id] ? (
                <li className="movie_genre" key={id}>
                  {genre[id]}
                </li>
              ) : null,
            )}
          </ul>
          <p className="movie_p">{overview}</p>
          <GhostSessions.Consumer>
            {(value) =>
              value ? (
                <Rate
                  onChange={(count) => {
                    addRating(count, movie);
                    localStorage.setItem(`localRating_${id}`, count);
                  }}
                  value={localStorage.getItem(`localRating_${id}`) || rating}
                  count={10}
                  size="small"
                />
              ) : null
            }
          </GhostSessions.Consumer>
        </div>
      </div>
    </li>
  );
};

export default MovieItems;
