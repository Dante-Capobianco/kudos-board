const Modal = (props) => {
  const exitModal = () => {
    props.setModalToOpen("");
  };

  return (
    <div
      className="modal-container"
      style={{ display: props.modalToOpen ? "flex" : "none" }}
      onClick={(event) =>
        event.target.className === "modal-container" ? exitModal() : null
      }
    >
      <div className="modal">
        <span class="modal-exit material-symbols-outlined" onClick={exitModal}>
          close
        </span>
      </div>
    </div>
  );
};

export default Modal;
