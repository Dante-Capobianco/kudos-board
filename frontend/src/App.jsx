import { useState } from "react";
import "./App.css";

function App() {
  const titleIconSrc = "/kudos.png";
  const titleIconAlt = "Kudos medal icon";
  const titleIconSize = "40px";
  const submit = "submit";

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchQueryToSubmit, setSearchQueryToSubmit] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    document.getElementById("submit-search-btn").blur();
    setSearchQueryToSubmit(searchValue);
  };

  const handleClear = (event) => {
    event.preventDefault();
    document.getElementById("clear-search-btn").blur();
    setSearchValue("");
    setSearchQueryToSubmit("");
  };

  return (
    <div className="app">
      <header>
        <h1>
          <img
            className="header-img"
            src={titleIconSrc}
            alt={titleIconAlt}
            width={titleIconSize}
          />
          Kudos Board
          <img
            className="header-img"
            src={titleIconSrc}
            alt={titleIconAlt}
            width={titleIconSize}
          />
        </h1>
        <p style={{ fontFamily: "fantasy" }}>
          Give a kudos, get a kudos... kudos all around!
        </p>

        <section className="search-sort-container">
          <span
            class="sidebar-icon material-symbols-outlined"
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          >
            {isSideBarOpen ? "density_medium" : "menu"}
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
      </header>
      <main></main>
    </div>
  );
}

export default App;
