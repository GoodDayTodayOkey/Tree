import React from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import Content from './components/Content';

function CustomModal(props) {
  const classes = useStyles();
  const { isOpen, handleChangeModalStatus } = props;
  const stopPropagation = (event) => {
    event.stopPropagation();
  }
  return (
    <div className={classes.modal} onClick={stopPropagation}>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isOpen}
        onClose={handleChangeModalStatus}
      >
        <div className={classes.modal__content}>
          <Content {...props} handleChangeModalStatus={handleChangeModalStatus} />
        </div>
      </Modal>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {},
    paper__item: {
      maxHeight: 300,
      overflow: 'auto'
    },
    modal__content: {},
  }),
);

export default CustomModal;