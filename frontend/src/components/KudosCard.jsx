const KudosCard = (props) => {
  const handleUpvote = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${props.PORT}${props.BOARD_ENDPOINT}/${
          props.boardId
        }${props.CARD_ENDPOINT}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: props.id,
            newUpvoteCount: props.upvotes + 1,
          }),
        }
      );
      if (response.ok) props.fetchAllCards();
    } catch (error) {}
  };

  return (
    <article className="board-card">
      <img
        src={props.src}
        alt={props.alt}
        className="board-img"
        style={{ paddingTop: 0 }}
      />
      <h2 className="board-title-card-message card-message">{props.message}</h2>
      <h3 className="upvote-delete upvote" onClick={handleUpvote}>
        <span className="material-symbols-outlined">thumb_up</span> Upvote:{" "}
        {props.upvotes}
      </h3>
    </article>
  );
};

export default KudosCard;
