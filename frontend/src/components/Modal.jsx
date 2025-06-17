import { useState } from "react";

const Modal = (props) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    //todo
  }

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
          <form className="modal-form">
            <label for="title">Title</label>
            <input
              id="title"
              type="text"
              className="text-input"
              placeholder="Enter board title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />

            <label for="category">Category</label>
            <select
              id="category"
              className="text-input dropdown-input"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="" disabled>
                Choose a category
              </option>
              <option value={props.celebration}>{props.celebration}</option>
              <option value={props.inspiration}>{props.inspiration}</option>
              <option value={props.thankYou}>{props.thankYou}</option>
            </select>

            <label for="author">Author (optional)</label>
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
              onClick={(event) => handleSubmit(event)}
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
