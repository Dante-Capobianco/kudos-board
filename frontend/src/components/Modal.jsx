import { useState } from "react";

const Modal = (props) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");

  const addBoardEndpoint = "/board/add";
  const addCardEndpoint = "/card/add";

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newBoard = { title, category };
      if (author) newBoard.author = author;

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${props.port}${addBoardEndpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBoard),
        }
      );

      if (!response.ok) {
        exitModal();
      }

      const data = await response.json();
    } catch (error) {
      exitModal();
    }
  };

  const exitModal = () => {
    props.setModalToOpen("");
    setTitle("");
    setCategory("");
    setAuthor("");
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

        <h2 className="modal-title">{`Add ${props.modalToOpen}`}</h2>

        {props.modalToOpen === "Board" ? (
          <form
            className="modal-form"
            onSubmit={(event) => handleSubmit(event)}
          >
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              className="text-input"
              placeholder="Enter board title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />

            <label htmlFor="category">Category</label>
            <select
              id="category"
              className="text-input dropdown-input"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required
            >
              <option value="" disabled>
                Choose a category
              </option>
              <option value={props.celebration}>{props.celebration}</option>
              <option value={props.inspiration}>{props.inspiration}</option>
              <option value={props.thankYou}>{props.thankYou}</option>
            </select>

            <label htmlFor="author">Author (optional)</label>
            <input
              id="author"
              type="text"
              className="text-input"
              placeholder="Enter board author"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />

            <button
              type="submit"
              className="search-btn modal-btn"
            >{`Create ${props.modalToOpen}`}</button>
          </form>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Modal;
