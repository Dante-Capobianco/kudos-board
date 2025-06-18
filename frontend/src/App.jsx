import { useState, useEffect } from "react";
import "./App.css";
import KudosBoardList from "./components/KudosBoardList";
import SearchBar from "./components/SearchBar";
import SideBar from "./components/SideBar";
import KudosCardList from "./components/KudosCardList";
import AddButton from "./components/AddButton";
import Modal from "./components/Modal";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {PageType} from "./utils/enums"

function App() {
  const TITLE_ICON_SRC = "/kudos.png";
  const TITLE_ICON_ALT = "Kudos medal icon";
  const TITLE_ICON_SIZE = "40px";
  const KUDOS_BOARD_LIST_HEIGHT = window.innerHeight * 0.75; // 75vh
  const BOARD_ENDPOINT = "/board";
  const CARD_ENDPOINT = "/card";
  const PORT = 3000;
  const MIN_FOOTER_HEIGHT = 50;

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [searchQueryToSubmit, setSearchQueryToSubmit] = useState("");
  const [currentPage, setCurrentPage] = useState(PageType.ALL);
  const [searchBarHeight, setSearchBarHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const [isHomePageOpen, setIsHomePageOpen] = useState(true);
  const [modalToOpen, setModalToOpen] = useState("");
  const [allBoards, setAllBoards] = useState([]);

  const fetchAllBoards = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${PORT}${BOARD_ENDPOINT}`,
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
      KUDOS_BOARD_LIST_HEIGHT;
    setFooterHeight(height > MIN_FOOTER_HEIGHT ? height : MIN_FOOTER_HEIGHT);
  }, [searchBarHeight]);

  return (
    <div>
      <header id="app-header">
        <h1>
          <img
            className="header-img"
            src={TITLE_ICON_SRC}
            alt={TITLE_ICON_ALT}
            width={TITLE_ICON_SIZE}
          />
          Kudos Board
          <img
            className="header-img"
            src={TITLE_ICON_SRC}
            alt={TITLE_ICON_ALT}
            width={TITLE_ICON_SIZE}
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

      <main style={{ height: KUDOS_BOARD_LIST_HEIGHT }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SideBar
                    isSideBarOpen={isSideBarOpen}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setIsHomePageOpen={setIsHomePageOpen}
                    setModalToOpen={setModalToOpen}
                  />
                  <KudosBoardList
                    currentPage={currentPage}
                    searchQueryToSubmit={searchQueryToSubmit}
                    setIsSideBarOpen={setIsSideBarOpen}
                    allBoards={allBoards}
                    fetchAllBoards={fetchAllBoards}
                    BOARD_ENDPOINT={BOARD_ENDPOINT}
                    PORT={PORT}
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
        PORT={PORT}
        BOARD_ENDPOINT={BOARD_ENDPOINT}
        CARD_ENDPOINT={CARD_ENDPOINT}
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
