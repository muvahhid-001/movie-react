import PropTypes from "prop-types";
import "./search-film.css";

const SearchFilm = ({ inputChange }) => {
  return (
    <input
      className="search_input"
      placeholder="Type to search..."
      onChange={inputChange}
    ></input>
  );
};

SearchFilm.propTypes = {
  inputChange: PropTypes.func.isRequired,
};

export default SearchFilm;
