import { useEffect } from "react";
import { useParams } from "react-router-dom";
import KudosCard from "./KudosCard";

const KudosCardList = (props) => {
  const { boardId } = useParams();

  useEffect(() => {
    props.setIsHomePageOpen(false);
    props.setModalToOpen("");
    props.setSelectedBoardId(boardId);
  }, []);

  useEffect(() => {
    props.fetchAllCards();
  }, [props.selectedBoardId]);

  return (
    <section className="board-card-list">
      {props.allCards.length > 0 ? (
        props.allCards.map((card) => (
          <KudosCard
            key={card.id}
            src={card.gif}
            alt={`${card.message} Image`}
            message={card.message}
            upvotes={card.upvotes}
            id={card.id}
            pinned={card.pinned}
            boardId={boardId}
            PORT={props.PORT}
            BOARD_ENDPOINT={props.BOARD_ENDPOINT}
            CARD_ENDPOINT={props.CARD_ENDPOINT}
            fetchAllCards={props.fetchAllCards}
          />
        ))
      ) : (
        <h2 style={{ marginTop: "5%" }}>No cards found - create one!</h2>
      )}
    </section>
  );
};

export default KudosCardList;
