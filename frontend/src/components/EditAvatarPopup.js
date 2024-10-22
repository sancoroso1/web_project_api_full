import { useRef } from "react";

import PopupWithForm from "./PopupWithForm";
function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <>
      <PopupWithForm
        name={"changepic"}
        title={"Cambiar foto de perfil"}
        buttonName={"Save"}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <label>
          <input
            type="url"
            name="image"
            id="pic-input"
            className="popup__input popup__input_type_picture"
            placeholder="Link de la imagen"
            ref={avatarRef}
            required
          />

          <span className="pic-input-error"></span>
        </label>
      </PopupWithForm>
    </>
  );
}

export default EditAvatarPopup;