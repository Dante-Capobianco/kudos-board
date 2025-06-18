import { useState, useEffect } from "react";
import "./App.css";
import KudosBoardList from "./components/KudosBoardList";
import SearchBar from "./components/SearchBar";
import SideBar from "./components/SideBar";
import KudosCardList from "./components/KudosCardList";
import AddButton from "./components/AddButton";
import Modal from "./components/Modal";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const titleIconSrc = "/kudos.png";
  const titleIconAlt = "Kudos medal icon";
  const titleIconSize = "40px";
  const kudosBoardListHeight = window.innerHeight * 0.75; // 75vh
  const all = "All";
  const recent = "Recent";
  const celebration = "Celebration";
  const thankYou = "Thank You";
  const inspiration = "Inspiration";
  const boardEndpoint = "/board";
  const cardEndpoint = "/card";
  const port = 3000;

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [searchQueryToSubmit, setSearchQueryToSubmit] = useState("");
  const [currentPage, setCurrentPage] = useState(all);
  const [searchBarHeight, setSearchBarHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const [isHomePageOpen, setIsHomePageOpen] = useState(true);
  const [modalToOpen, setModalToOpen] = useState("");
  const [allBoards, setAllBoards] = useState([]);

  const fetchAllBoards = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${port}${boardEndpoint}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAllBoards(data);
      }
    } catch (error) {}
  };

  // On initial render, use header/banner, tile list, and window heights to dynamically set height of footer to be responsive
  useEffect(() => {
    let height =
      window.innerHeight -
      document.getElementById("app-header")?.offsetHeight -
      searchBarHeight -
      kudosBoardListHeight;
    setFooterHeight(height > 50 ? height : 50);
  }, [searchBarHeight]);

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

        <SearchBar
          setIsSideBarOpen={setIsSideBarOpen}
          setSearchQueryToSubmit={setSearchQueryToSubmit}
          isSideBarOpen={isSideBarOpen}
          setSearchBarHeight={setSearchBarHeight}
          isHomePageOpen={isHomePageOpen}
        />
      </header>

      <main style={{ height: kudosBoardListHeight }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SideBar
                    all={all}
                    recent={recent}
                    celebration={celebration}
                    thankYou={thankYou}
                    inspiration={inspiration}
                    isSideBarOpen={isSideBarOpen}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setIsHomePageOpen={setIsHomePageOpen}
                    setModalToOpen={setModalToOpen}
                  />
                  <KudosBoardList
                    currentPage={currentPage}
                    all={all}
                    recent={recent}
                    celebration={celebration}
                    thankYou={thankYou}
                    inspiration={inspiration}
                    searchQueryToSubmit={searchQueryToSubmit}
                    setIsSideBarOpen={setIsSideBarOpen}
                    allBoards={allBoards}
                    fetchAllBoards={fetchAllBoards}
                  />
                  <AddButton
                    itemToAdd="Board"
                    setModalToOpen={setModalToOpen}
                  />
                </>
              }
            />
            <Route
              path="/board/:boardId"
              element={
                <>
                  <KudosCardList
                    setIsHomePageOpen={setIsHomePageOpen}
                    setModalToOpen={setModalToOpen}
                  />
                  <AddButton itemToAdd="Card" setModalToOpen={setModalToOpen} />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </main>

      <Modal
        modalToOpen={modalToOpen}
        setModalToOpen={setModalToOpen}
        celebration={celebration}
        thankYou={thankYou}
        inspiration={inspiration}
        port={port}
        boardEndpoint={boardEndpoint}
        cardEndpoint={cardEndpoint}
        fetchAllBoards={fetchAllBoards}
      />

      <footer style={{ height: footerHeight }}>
        <h4>By: Dante Capobianco</h4>
        <h4>&copy; 2025 Kudos Board</h4>
      </footer>
    </div>
  );
}

export default App;
