import React from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

const BackDrop = (props) => {
  //console.log('backdrop props', props);
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  //console.log('modal props', props);
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onClose={props.onClose} />,
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