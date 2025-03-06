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

export default SearchFilm;
