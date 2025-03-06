import SearchFilm from "../search-film/search-film";
import "./header.css";

const Header = ({ inputChange, changeTab, tabValue }) => (
  <header>
    <div className="header_components">
      <div className="buttons">
        <button
          className={`button_search ${tabValue === 1 ? "active_button" : ""}`}
          onClick={() => changeTab(1)}
        >
          Search
        </button>
        <button
          className={`button_rated ${tabValue === 2 ? "active_button" : ""}`}
          onClick={() => changeTab(2)}
        >
          Rated
        </button>
      </div>
      {tabValue === 1 && <SearchFilm inputChange={inputChange} />}
    </div>
  </header>
);

export default Header;
