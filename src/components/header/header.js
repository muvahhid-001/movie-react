import SearchFilm from "../search-input/search-input";
import "./header.css";
const Header = () => {
  return (
    <header>
      <div className="header_components">
        <div className="buttons">
          <button className="button_search active_button">Search</button>
          <button className="button_rated">Rated</button>
        </div>
        <SearchFilm />
      </div>
    </header>
  );
};

export default Header;
