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
  const [commentMessage, setCommentMessage] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");
  const GIF_LIMIT = 12;

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
        `${import.meta.env.VITE_BASE_URL}${props.PORT}${props.BOARD_ENDPOINT}/${
          props.selectedBoardId
        }${props.CARD_ENDPOINT}`,
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

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (!props.selectedCardId) exitModal();

    try {
      const newComment = { message: commentMessage };
      if (commentAuthor) newComment.author = commentAuthor;

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${props.PORT}${props.BOARD_ENDPOINT}/${
          props.selectedBoardId
        }${props.CARD_ENDPOINT}/${props.selectedCardId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        }
      );

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
    } else if (props.modalToOpen === "Comment") {
      props.setSelectedCardId(null);
      setCommentMessage("");
      setCommentAuthor("");
    } else if (props.modalToOpen === "Card Details") {
      props.setSelectedCardDetails(null);
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
          }&q=${gifSearch}&limit=${GIF_LIMIT}`
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
  };

  const renderForm = () => {
    switch (props.modalToOpen) {
      case "Board":
        return (
          <form
            className="modal-form"
            onSubmit={(event) => handleBoardSubmit(event)}
          >
            <label className="modal-label" htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              className="text-input"
              placeholder="Enter board title"
              value={boardTitle}
              onChange={(event) => setBoardTitle(event.target.value)}
              required
            />

            <label className="modal-label" htmlFor="category">Category</label>
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

            <label className="modal-label" htmlFor="author">Author (optional)</label>
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
        );
      case "Card":
        return (
          <form
            className="modal-form"
            onSubmit={(event) => handleCardSubmit(event)}
          >
            <label className="modal-label" htmlFor="message">Message</label>
            <input
              id="message"
              type="text"
              className="text-input"
              placeholder="Enter card message"
              value={cardMessage}
              onChange={(event) => setCardMessage(event.target.value)}
              required
            />

            <label className="modal-label" htmlFor="gifSearch">GIF Search</label>
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
            <div className="selected-gif">Selected Gif: {gifTitle ? gifTitle : "None selected"}</div>

            <section className="gif-container">
              {gifOptions.map((gif) => (
                <img
                  key={gif.id}
                  src={gif?.images?.original?.url}
                  alt={gif.title}
                  className="gif-img"
                  onClick={() =>
                    selectGif(gif?.images?.original?.url, gif.title)
                  }
                />
              ))}
            </section>

            <label className="modal-label" htmlFor="author">Author (optional)</label>
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
        );
      case "Comment":
        return (
          <form
            className="modal-form"
            onSubmit={(event) => handleCommentSubmit(event)}
          >
            <label className="modal-label" htmlFor="message">Message</label>
            <input
              id="message"
              type="text"
              className="text-input"
              placeholder="Enter comment message"
              value={commentMessage}
              onChange={(event) => setCommentMessage(event.target.value)}
              required
            />

            <label className="modal-label" htmlFor="author">Author (optional)</label>
            <input
              id="author"
              type="text"
              className="text-input"
              placeholder="Enter comment author"
              value={commentAuthor}
              onChange={(event) => setCommentAuthor(event.target.value)}
            />

            <button
              type="submit"
              className="search-btn modal-btn"
            >{`Create ${props.modalToOpen}`}</button>
          </form>
        );
      case "Card Details":
        return (
          <section className="card-details-container">
            <img
              src={props.selectedCardDetails.gif}
              alt={props.alt}
              className="board-img"
              style={{ height: "30vh" }}
            />

            <h3>
              Message: <span>{props.selectedCardDetails.message}</span>
            </h3>
            {props.selectedCardDetails.author ? (
              <h3>
                Author: <span>{props.selectedCardDetails.author}</span>
              </h3>
            ) : (
              <></>
            )}

            <h3 style={{ marginBottom: 0 }}>Comments:</h3>
            {props.selectedCardDetails.comments.length > 0 ? (
              props.selectedCardDetails.comments.map((comment, index) => (
                <article
                  className="card-details-comment"
                  style={
                    index === props.selectedCardDetails.comments.length - 1
                      ? { border: "none" }
                      : {}
                  }
                >
                  <h4 style={{ margin: 0 }}>Message: {comment.message}</h4>
                  {comment.author ? (
                    <h4 style={{ margin: 0 }}>Author: {comment.author}</h4>
                  ) : (
                    <></>
                  )}
                </article>
              ))
            ) : (
              <h4>No comments created - create one!</h4>
            )}
          </section>
        );
      default:
        return <></>;
    }
  };

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

        <h2 className="modal-title">{`${
          props.modalToOpen !== "Card Details" ? "Add " : ""
        }${props.modalToOpen}`}</h2>
        {renderForm()}
      </div>
    </div>
  );
};

export default Modal;
