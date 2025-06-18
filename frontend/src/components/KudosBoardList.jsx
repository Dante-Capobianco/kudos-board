import KudosBoard from "./KudosBoard.jsx";
import { useState, useEffect } from "react";
import { PageType } from "../utils/enums";

const KudosBoardList = (props) => {
  const [boardsToDisplay, setBoardsToDisplay] = useState(props.allBoards);

  const updateBoardsToDisplay = () => {
    let newBoardsToDisplay;
    switch (props.currentPage) {
      case PageType.ALL:
        newBoardsToDisplay = props.allBoards;
        break;
      case PageType.RECENT:
        newBoardsToDisplay = props.allBoards
          .toSorted(
            (boardA, boardB) => new Date(boardB.createdAt) - new Date(boardA.createdAt)
          )
          .slice(0, 6);
        break;
      case PageType.CELEBRATION:
        newBoardsToDisplay = props.allBoards.filter(
          (board) => board.category === PageType.CELEBRATION
        );
        break;
      case PageType.THANK_YOU:
        newBoardsToDisplay = props.allBoards.filter(
          (board) => board.category === PageType.THANK_YOU
        );
        break;
      case PageType.INSPIRATION:
        newBoardsToDisplay = props.allBoards.filter(
          (board) => board.category === PageType.INSPIRATION
        );
        break;
    }

    filterBySearchTerm(newBoardsToDisplay);
  };

  const filterBySearchTerm = (newBoardsToDisplay) => {
    if (props.searchQueryToSubmit) {
      newBoardsToDisplay = newBoardsToDisplay.filter((board) =>
        board.title.includes(props.searchQueryToSubmit)
      );
    }

    setBoardsToDisplay(newBoardsToDisplay);
  };

  useEffect(() => {
    updateBoardsToDisplay();
  }, [props.allBoards, props.currentPage, props.searchQueryToSubmit]);

  useEffect(() => {
    props.fetchAllBoards();
  }, []);

  return (
    <section
      className="board-card-list"
      onMouseEnter={() => props.setIsSideBarOpen(false)}
    >
      {boardsToDisplay.length > 0 ? (
        boardsToDisplay.map((board) => (
          <KudosBoard
            key={board.id}
            src={`https://picsum.photos/id/${board.id}/200/200`}
            alt={`${board.title} Image`}
            title={board.title}
            category={board.category}
            id={board.id}
            author={board.author}
            PORT={props.PORT}
            BOARD_ENDPOINT={props.BOARD_ENDPOINT}
            fetchAllBoards={props.fetchAllBoards}
            setSelectedBoardId={props.setSelectedBoardId}
          />
        ))
      ) : (
        <h2>No boards found - create one!</h2>
      )}
    </section>
  );
};

export default KudosBoardList;
