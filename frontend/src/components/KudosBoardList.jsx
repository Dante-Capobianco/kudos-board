import KudosBoard from "./KudosBoard.jsx";

const KudosBoardList = () => {

  return (
    <section className="board-list">
      {kudosBoardList.map((board) => (
        <KudosBoard
          key={board.id}
          src="/placeholder.png"
          alt={`${board.title} Image`}
          title={board.title}
          category={board.category}
        />
      ))}
    </section>
  );
};

export default KudosBoardList;
