import { useState, useEffect } from "react";
import "./App.css";
import KudosBoardList from "./components/KudosBoardList";

function App() {
  const titleIconSrc = "/kudos.png";
  const titleIconAlt = "Kudos medal icon";
  const titleIconSize = "40px";
  const submit = "submit";
  const kudosBoardListHeight = window.innerHeight * 0.75; // 75vh
  const all = "All";
  const recent = "Recent";
  const celebration = "Celebration";
  const thankYou = "Thank You";
  const inspiration = "Inspiration";

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchQueryToSubmit, setSearchQueryToSubmit] = useState("");
  const [currentPage, setCurrentPage] = useState(all);
  const [footerHeight, setFooterHeight] = useState(0);

  // On initial render, use header/banner, tile list, and window heights to dynamically set height of footer to be responsive
  useEffect(() => {
    let height =
      window.innerHeight -
      document.getElementById("app-header")?.offsetHeight -
      kudosBoardListHeight;
    setFooterHeight(height > 50 ? height : 50);
  }, []);

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
    <div>
      <header id="app-header">
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
          Give kudos, get kudos... kudos all around!
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

      <main style={{ height: kudosBoardListHeight }}>
        <nav
          className="sidebar-container"
          style={{
            left: isSideBarOpen ? 0 : "-20vw",
            boxShadow: isSideBarOpen ? "20px 0px 40px black" : "",
          }}
        >
          <ul className="sidebar-options">
            <li
              className={`sidebar-option ${
                currentPage === all ? "current-page" : ""
              }`}
              onClick={() => setCurrentPage(all)}
            >
              {all}
            </li>
            <li
              className={`sidebar-option ${
                currentPage === recent ? "current-page" : ""
              }`}
              onClick={() => setCurrentPage(recent)}
            >
              {recent}
            </li>
            <li
              className={`sidebar-option ${
                currentPage === celebration ? "current-page" : ""
              }`}
              onClick={() => setCurrentPage(celebration)}
            >
              {celebration}
            </li>
            <li
              className={`sidebar-option ${
                currentPage === thankYou ? "current-page" : ""
              }`}
              onClick={() => setCurrentPage(thankYou)}
            >
              {thankYou}
            </li>
            <li
              className={`sidebar-option ${
                currentPage === inspiration ? "current-page" : ""
              }`}
              onClick={() => setCurrentPage(inspiration)}
            >
              {inspiration}
            </li>
          </ul>
        </nav>
        <KudosBoardList
          currentPage={currentPage}
          all={all}
          recent={recent}
          celebration={celebration}
          thankYou={thankYou}
          inspiration={inspiration}
          searchQueryToSubmit={searchQueryToSubmit}
        />
      </main>

      <footer style={{ height: footerHeight }}>
        <h4>By: Dante Capobianco</h4>
        <h4>&copy; 2025 Kudos Board</h4>
      </footer>
    </div>
  );
}

export default App;
