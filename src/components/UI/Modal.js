import React from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

const BackDrop = (props) => <div className={classes.backdrop} />;

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop />,
        document.querySelector('#backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.querySelector('#overlay-root')
      )}
    </>
  );
};

export default Modal;