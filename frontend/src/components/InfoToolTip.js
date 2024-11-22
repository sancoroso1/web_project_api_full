function InfoToolTip({ isOpen, popupType, handleClose }) {
  return (
    <section className={`popup ${isOpen ? 'popup__opened' : ''}`}>
      <div className='popup__container'>
        <button
          type='button'
          className='popup__close-button'
          onClick={handleClose}
        >
          <img
            src={require('../styles/images/Close__Icon.png')}
            alt='Boton cerrar'
          />
        </button>
        <div className='popup__form-container'>
          <form className='popup__form'>
            <fieldset className='popup__formset'>
              <div>
                <img
                  src={
                    popupType === 'success'
                      ? require('../styles/images/correct.png')
                      : require('../styles/images/incorrect.png')
                  }
                />
                <p className='popup__message'>
                  {popupType === 'success'
                    ? '¡Correcto! Ya estás registrado.'
                    : 'Uy, algo salió mal. Por favor, intentalo de nuevo.'}
                </p>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </section>
  );
}

export default InfoToolTip;
