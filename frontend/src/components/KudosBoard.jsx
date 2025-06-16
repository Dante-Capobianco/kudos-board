const KudosBoard = (props) => {
  return (
    <article className="board">
      <img src={props.src} alt={props.alt} className="board-img" />
      <h2>{props.title}</h2>
      <h3>Category: {props.category}</h3>
    </article>
  );
};

export default KudosBoard;
