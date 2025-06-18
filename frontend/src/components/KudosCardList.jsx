import { useEffect } from "react";
import { useParams } from "react-router-dom";

const KudosCardList = (props) => {
  const { boardId } = useParams();

  useEffect(() => {
    props.fetchAllCards();
    props.setIsHomePageOpen(false);
    props.setModalToOpen("");
    props.setSelectedBoardId(boardId);
  }, [])
  
  return <div className="board-card-list">{boardId}</div>;
};

export default KudosCardList;
