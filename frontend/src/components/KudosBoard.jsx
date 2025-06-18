import { useNavigate } from "react-router-dom";

const KudosBoard = (props) => {
  const navigate = useNavigate();

  const deleteBoard = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${props.PORT}${props.BOARD_ENDPOINT}/${
          props.id
        }`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) props.fetchAllBoards();
    } catch (error) {}
  };

  const navigateToBoardPage = () => {
    props.setSelectedBoardId(props.id);
    navigate(`/board/${props.id}`);
  };

  return (
    <article
      className="board-card"
      onClick={(event) =>
        event.target.className !== "delete-container"
          ? navigateToBoardPage()
          : null
      }
    >
      <img src={props.src} alt={props.alt} className="board-img" />
      <h2 className="board-title-card-message board-title">{props.title}</h2>
      <h3 className="card-category">Category: {props.category}</h3>
      <h3 className="delete-container" onClick={deleteBoard}>
        <span className="material-symbols-outlined">delete</span>
        Delete
      </h3>
    </article>
  );
};

export default KudosBoard;
