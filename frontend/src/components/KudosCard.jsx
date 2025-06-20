const KudosCard = (props) => {
  const PIN_ENDPOINT = "/pin";

  const handleUpvote = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${props.PORT}${props.BOARD_ENDPOINT}/${
          props.boardId
        }${props.CARD_ENDPOINT}/${props.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newUpvoteCount: props.upvotes + 1,
          }),
        }
      );
      if (response.ok) props.fetchAllCards();
    } catch (error) {}
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${props.PORT}${props.BOARD_ENDPOINT}/${
          props.boardId
        }${props.CARD_ENDPOINT}/${props.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) props.fetchAllCards();
    } catch (error) {}
  };

  const handlePin = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${props.PORT}${props.BOARD_ENDPOINT}/${
          props.boardId
        }${props.CARD_ENDPOINT}${PIN_ENDPOINT}/${props.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPinnedStatus: !props.pinned,
          }),
        }
      );
      if (response.ok) props.fetchAllCards();
      
    } catch (error) {}
  };

  const fetchCardDetails = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${props.PORT}${props.BOARD_ENDPOINT}/${
          props.boardId
        }${props.CARD_ENDPOINT}/${props.id}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        props.setSelectedCardDetails(data);
        props.setModalToOpen("Card Details");
      }
    } catch (error) {}
  };

  const handleComment = () => {
    props.setSelectedCardId(props.id);
    props.setModalToOpen("Comment");
  };

  return (
    <article
      className="board-card"
      onClick={(event) =>
        event.target.className.includes("board-img") ||
        event.target.className.includes("board-card") ||
        event.target.className.includes("board-title-card-message")
          ? fetchCardDetails()
          : null
      }
    >
      <span
        className={`${
          props.pinned ? "pinned" : ""
        } card-pin material-symbols-outlined`}
        onClick={handlePin}
      >
        keep
      </span>
      <img
        src={props.src}
        alt={props.alt}
        className="board-img"
        style={{ paddingTop: 0 }}
      />
      <h2 className="board-title-card-message card-message">{props.message}</h2>
      <span style={{ height: "5px" }}></span>
      <h3 className="upvote-delete upvote" onClick={handleUpvote}>
        <span className="material-symbols-outlined">thumb_up</span> Upvote:{" "}
        {props.upvotes}
      </h3>
      <div className="delete-comment-container">
        <h3 className="comment-container delete-card" onClick={handleComment}>
          <span className="material-symbols-outlined">add_comment</span>
          Comment
        </h3>
        <h3 className="delete-container delete-card" onClick={handleDelete}>
          <span className="material-symbols-outlined">delete</span>
          Delete
        </h3>
      </div>
    </article>
  );
};

export default KudosCard;
