import { useNavigate } from 'react-router-dom';

const KudosBoard = (props) => {
  const navigate = useNavigate();

  return (
    <article className="board" onClick={() => navigate(`/board/${props.id}`)}>
      <img src={props.src} alt={props.alt} className="board-img" />
      <h2>{props.title}</h2>
      <h3>Category: {props.category}</h3>
    </article>
  );
};

export default KudosBoard;
