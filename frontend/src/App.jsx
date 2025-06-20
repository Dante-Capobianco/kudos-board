import { useState, useEffect } from "react";
import "./App.css";
import KudosBoardList from "./components/KudosBoardList";
import SearchBar from "./components/SearchBar";
import SideBar from "./components/SideBar";
import KudosCardList from "./components/KudosCardList";
import AddButton from "./components/AddButton";
import Modal from "./components/Modal";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { PageType } from "./utils/enums";

function App() {
  const TITLE_ICON_SRC = "/kudos.png";
  const TITLE_ICON_ALT = "Kudos medal icon";
  const TITLE_ICON_SIZE = "40px";
  const KUDOS_BOARD_LIST_HEIGHT = window.innerHeight * 0.75; // 75vh
  const BOARD_ENDPOINT = "/board";
  const CARD_ENDPOINT = "/card";
  const PORT = 3000;
  const MIN_FOOTER_HEIGHT = 50;
  const ERROR_TEXT = "Page Not Found";
  const BOARD = "Board";
  const CARD = "Card";

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [searchQueryToSubmit, setSearchQueryToSubmit] = useState("");
  const [currentPage, setCurrentPage] = useState(PageType.ALL);
  const [searchBarHeight, setSearchBarHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const [isHomePageOpen, setIsHomePageOpen] = useState(true);
  const [modalToOpen, setModalToOpen] = useState("");
  const [allBoards, setAllBoards] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [selectedCardDetails, setSelectedCardDetails] = useState(null);
  const [isLightMode, setIsLightMode] = useState(true);

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

  const sortCards = (cardA, cardB) => {
    if (cardA.pinned && !cardB.pinned) {
      return -1;
    } else if (!cardA.pinned && cardB.pinned) {
      return 1;
    } else if (cardA.pinned && cardB.pinned) {
      return new Date(cardB.updatedAt) - new Date(cardA.updatedAt);
    } else {
      return new Date(cardB.createdAt) - new Date(cardA.createdAt);
    }
  };

  const fetchAllCards = async () => {
    if (!selectedBoardId) return;
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }${PORT}${BOARD_ENDPOINT}/${selectedBoardId}${CARD_ENDPOINT}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        data.sort((cardA, cardB) => sortCards(cardA, cardB));
        setAllCards(data);
      }
    } catch (error) {}
  };

  const returnToHomePage = () => {
    setAllCards([]);
    setSelectedBoardId(null);
  };

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
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
            setSelectedBoardId={setSelectedBoardId}
          />
          <AddButton itemToAdd={BOARD} setModalToOpen={setModalToOpen} />
        </>
      ),
      errorElement: <h2>{ERROR_TEXT}</h2>,
    },
    {
      path: "/board/:boardId",
      element: (
        <>
          <Link to="/" onClick={returnToHomePage} className="back-link">
            <span className="modal-exit material-symbols-outlined">
              arrow_back
            </span>
          </Link>
          <KudosCardList
            setIsHomePageOpen={setIsHomePageOpen}
            setModalToOpen={setModalToOpen}
            fetchAllCards={fetchAllCards}
            allCards={allCards}
            setSelectedBoardId={setSelectedBoardId}
            selectedBoardId={selectedBoardId}
            PORT={PORT}
            BOARD_ENDPOINT={BOARD_ENDPOINT}
            CARD_ENDPOINT={CARD_ENDPOINT}
            setSelectedCardId={setSelectedCardId}
            setSelectedCardDetails={setSelectedCardDetails}
          />
          <AddButton itemToAdd={CARD} setModalToOpen={setModalToOpen} />
        </>
      ),
    },
  ]);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isLightMode ? "light" : "dark"
    );
  }, [isLightMode]);

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
        <div
          className="color-mode"
          onClick={() => setIsLightMode(!isLightMode)}
        >
          <span class="color-mode-icon material-symbols-outlined">
            {isLightMode ? "brightness_5" : "brightness_3"}
          </span>
          <span>{isLightMode ? "Light Mode" : "Dark Mode"}</span>
        </div>

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
        <p className="title-tagline">
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
        <RouterProvider router={routes} />
      </main>

      <Modal
        modalToOpen={modalToOpen}
        setModalToOpen={setModalToOpen}
        PORT={PORT}
        BOARD_ENDPOINT={BOARD_ENDPOINT}
        CARD_ENDPOINT={CARD_ENDPOINT}
        fetchAllBoards={fetchAllBoards}
        fetchAllCards={fetchAllCards}
        selectedBoardId={selectedBoardId}
        selectedCardId={selectedCardId}
        setSelectedCardId={setSelectedCardId}
        setSelectedCardDetails={setSelectedCardDetails}
        selectedCardDetails={selectedCardDetails}
      />

      <footer style={{ height: footerHeight }}>
        <h4>By: Dante Capobianco</h4>
        <h4>&copy; 2025 Kudos Board</h4>
      </footer>
    </div>
  );
}

export default App;
