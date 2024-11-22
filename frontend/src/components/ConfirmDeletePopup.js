import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({ cardId, onClose, onCardDelete, card }) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(cardId);
  }
  return (
    <>
      <PopupWithForm
        name={"erase"}
        title={"¿Confirmar?"}
        buttonName={"Borrar"}
        isOpen={cardId}
        onClose={onClose}
        onSubmit={handleSubmit}
      ></PopupWithForm>
    </>
  );
}

export default ConfirmDeletePopup;