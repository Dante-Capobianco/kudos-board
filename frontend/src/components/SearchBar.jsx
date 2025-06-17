import { useEffect, useState } from "react";

const SearchBar = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const submit = "submit";

  const handleSubmit = (event) => {
    event.preventDefault();
    document.getElementById("submit-search-btn").blur();
    props.setSearchQueryToSubmit(searchValue);
  };

  const handleClear = (event) => {
    event.preventDefault();
    document.getElementById("clear-search-btn").blur();
    setSearchValue("");
    props.setSearchQueryToSubmit("");
  };

  useEffect(() => {
    props.setSearchBarHeight(
      document.getElementById("search-container")?.offsetHeight
    );
  }, [props.isHomePageOpen]);

  return (
    <section id="search-container" className="search-container" style={props.isHomePageOpen ? {} : {display: "none"}}>
      <span
        class="sidebar-icon material-symbols-outlined"
        onClick={() => props.setIsSideBarOpen(!props.isSideBarOpen)}
      >
        {props.isSideBarOpen ? "density_medium" : "menu"}
      </span>
      <form>
        <input
          type="text"
          class="search-bar"
          placeholder="Search for a board by title"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <button
          type={submit}
          onClick={(event) => handleSubmit(event)}
          id="submit-search-btn"
          className="search-btn"
        >
          Search
        </button>
        <button
          type={submit}
          onClick={(event) => handleClear(event)}
          id="clear-search-btn"
          className="search-btn"
        >
          Clear
        </button>
      </form>
    </section>
  );
};

export default SearchBar;
