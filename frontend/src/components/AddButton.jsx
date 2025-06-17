const AddButton = (props) => {
  const handleAdd = () => {
    document.getElementById("add-btn").blur();
    props.setModalToOpen(props.itemToAdd);
  };

  return (
    <button
      id="add-btn"
      className="add-btn"
      style={props.itemToAdd === "Card" ? { marginBottom: "5vh" } : {}}
      onClick={handleAdd}
    >
      {`+ Add ${props.itemToAdd}`}
    </button>
  );
};

export default AddButton;
