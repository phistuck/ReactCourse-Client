import React from 'react'

const modal = ({ handleOkClick, show, okButtonLabel, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <button className="model_ok_button" onClick={handleOkClick}>{okButtonLabel}</button>
        </section>
      </div>
    );
  };

export default modal
