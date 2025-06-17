import KudosBoard from "./KudosBoard.jsx";
import { kudosBoardData } from "../../testData.js";
import { useState, useEffect } from "react";

const KudosBoardList = (props) => {
  const kudosBoards = kudosBoardData;
  const [boardsToDisplay, setBoardsToDisplay] = useState(kudosBoards);

  const updateBoardsToDisplay = () => {
    let newBoardsToDisplay;
    switch (props.currentPage) {
      case props.all:
        newBoardsToDisplay = kudosBoards;
        break;
      case props.recent:
        //todo: https://docs.google.com/document/d/1zdT1PrCLJ-UU60-sMpy_jReyd3tehnzBKxdxPFKIO7g/edit?tab=t.0
        break;
      case props.celebration:
        newBoardsToDisplay = kudosBoards.filter(
          (board) => board.category === props.celebration
        );
        break;
      case props.thankYou:
        newBoardsToDisplay = kudosBoards.filter(
          (board) => board.category === props.thankYou
        );
        break;
      case props.inspiration:
        newBoardsToDisplay = kudosBoards.filter(
          (board) => board.category === props.inspiration
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
  }

  useEffect(() => {
    updateBoardsToDisplay();
  }, [props.currentPage, props.searchQueryToSubmit]);

  return (
    <section
      className="board-list"
      onMouseEnter={() => props.setIsSideBarOpen(false)}
    >
      {boardsToDisplay.length > 0 ? (
        boardsToDisplay.map((board) => (
          <KudosBoard
            key={board.id}
            src="/placeholder.png"
            alt={`${board.title} Image`}
            title={board.title}
            category={board.category}
          />
        ))
      ) : (
        <h2>No boards found - create one!</h2>
      )}
    </section>
  );
};

export default KudosBoardList;
