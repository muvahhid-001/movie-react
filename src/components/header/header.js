import SearchFilm from "../search-film/search-film";
import PropTypes from "prop-types";
import "./header.css";

const Header = ({
  inputChange = () => {},
  changeTab = () => {},
  tabValue = 1,
}) => (
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

Header.propTypes = {
  inputChange: PropTypes.func,
  changeTab: PropTypes.func,
  tabValue: PropTypes.number,
};

export default Header;
