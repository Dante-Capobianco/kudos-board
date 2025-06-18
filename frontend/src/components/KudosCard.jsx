const KudosCard = (props) => {
  return (
    <article
      className="board-card"
    >
      <img src={props.src} alt={props.alt} className="board-img" style={{paddingTop: 0}} />
      <h2 className="board-title-card-message">{props.message}</h2>
    </article>
  );
};

export default KudosCard;
