import { useState } from "react";
import { PageType } from "../utils/enums";

const Modal = (props) => {
  const [boardTitle, setBoardTitle] = useState("");
  const [boardCategory, setBoardCategory] = useState("");
  const [boardAuthor, setBoardAuthor] = useState("");
  const [cardMessage, setCardMessage] = useState("");
  const [gifSearch, setGifSearch] = useState("");
  const [gifOptions, setGifOptions] = useState([]);
  const [gifTitle, setGifTitle] = useState("");
  const [gifURL, setGifURL] = useState("");
  const [cardAuthor, setCardAuthor] = useState("");
  const gifLimit = 12;

  const handleBoardSubmit = async (event) => {
    event.preventDefault();

    try {
      const newBoard = { title: boardTitle, category: boardCategory };
      if (boardAuthor) newBoard.author = boardAuthor;

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${props.PORT}${props.BOARD_ENDPOINT}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBoard),
        }
      );

      if (response.ok) props.fetchAllBoards();

      exitModal();
    } catch (error) {
      exitModal();
    }
  };

  const handleCardSubmit = async (event) => {
    event.preventDefault();
    try {
      const newCard = { message: cardMessage, gif: gifURL };
      if (cardAuthor) newCard.author = cardAuthor;

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${props.PORT}${props.BOARD_ENDPOINT}/${props.selectedBoardId}${props.CARD_ENDPOINT}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCard),
        }
      );

      if (response.ok) props.fetchAllCards();

      exitModal();
    } catch (error) {
      exitModal();
    }
  };

  const exitModal = () => {
    if (props.modalToOpen === "Board") {
      setBoardTitle("");
      setBoardCategory("");
      setBoardAuthor("");
    } else if (props.modalToOpen === "Card") {
      setCardMessage("");
      setGifSearch("");
      setGifTitle("");
      setGifURL("");
      setGifOptions([]);
      setCardAuthor("");
    }
    props.setModalToOpen("");
  };

  const searchForGif = async () => {
    document.getElementById("gif-search-btn").blur();
    if (gifSearch) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_GIPHY_BASE_URL}?api_key=${
            import.meta.env.VITE_API_KEY
          }&q=${gifSearch}&limit=${gifLimit}`
        );

        if (response.ok) {
          const data = await response.json();
          setGifOptions(data.data);
        } else {
          exitModal();
        }
      } catch (error) {
        exitModal();
      }
    }
  };

  const selectGif = (gifURL, gifTitle) => {
    setGifURL(gifURL);
    setGifTitle(gifTitle);
  }

  return (
    <div
      className="modal-container"
      style={{ display: props.modalToOpen ? "flex" : "none" }}
      onClick={(event) =>
        event.target.className === "modal-container" ? exitModal() : null
      }
    >
      <div className="modal">
        <span
          className="modal-exit material-symbols-outlined"
          onClick={exitModal}
        >
          close
        </span>

        <h2 className="modal-title">{`Add ${props.modalToOpen}`}</h2>

        {props.modalToOpen === "Board" ? (
          <form
            className="modal-form"
            onSubmit={(event) => handleBoardSubmit(event)}
          >
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              className="text-input"
              placeholder="Enter board title"
              value={boardTitle}
              onChange={(event) => setBoardTitle(event.target.value)}
              required
            />

            <label htmlFor="category">Category</label>
            <select
              id="category"
              className="text-input dropdown-input"
              value={boardCategory}
              onChange={(event) => setBoardCategory(event.target.value)}
              required
            >
              <option value="" disabled>
                Choose a category
              </option>
              <option value={PageType.CELEBRATION}>
                {PageType.CELEBRATION}
              </option>
              <option value={PageType.INSPIRATION}>
                {PageType.INSPIRATION}
              </option>
              <option value={PageType.THANK_YOU}>{PageType.THANK_YOU}</option>
            </select>

            <label htmlFor="author">Author (optional)</label>
            <input
              id="author"
              type="text"
              className="text-input"
              placeholder="Enter board author"
              value={boardAuthor}
              onChange={(event) => setBoardAuthor(event.target.value)}
            />

            <button
              type="submit"
              className="search-btn modal-btn"
            >{`Create ${props.modalToOpen}`}</button>
          </form>
        ) : (
          <form
            className="modal-form"
            onSubmit={(event) => handleCardSubmit(event)}
          >
            <label htmlFor="message">Message</label>
            <input
              id="message"
              type="text"
              className="text-input"
              placeholder="Enter card message"
              value={cardMessage}
              onChange={(event) => setCardMessage(event.target.value)}
              required
            />

            <label htmlFor="gifSearch">GIF Search</label>
            <div>
              <input
                id="gifSearch"
                type="text"
                className="text-input"
                placeholder="Search for a GIF"
                value={gifSearch}
                onChange={(event) => setGifSearch(event.target.value)}
              />
              <button
                id="gif-search-btn"
                type="button"
                className="search-btn"
                onClick={searchForGif}
              >
                Search
              </button>
            </div>
            <div>Selected Gif: {gifTitle ? gifTitle : "None selected"}</div>

            <section className="gif-container">
              {gifOptions.map((gif) => (
                <img
                  key={gif.id}
                  src={gif?.images?.original?.url}
                  alt={gif.title}
                  className="gif-img"
                  onClick={() => selectGif(gif?.images?.original?.url, gif.title)}
                />
              ))}
            </section>

            <label htmlFor="author">Author (optional)</label>
            <input
              id="author"
              type="text"
              className="text-input"
              placeholder="Enter card author"
              value={cardAuthor}
              onChange={(event) => setCardAuthor(event.target.value)}
            />

            <button
              type="submit"
              className="search-btn modal-btn"
              disabled={!gifTitle}
            >{`Create ${props.modalToOpen}`}</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Modal;
