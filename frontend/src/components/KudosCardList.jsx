import { useEffect } from "react";
import { useParams } from "react-router-dom";

const KudosCardList = (props) => {
  const { boardId } = useParams();

  useEffect(() => {
    props.setIsHomePageOpen(false);
  }, [])
  return <div>{boardId}</div>;
};

export default KudosCardList;
