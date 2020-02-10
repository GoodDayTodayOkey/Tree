import React from 'react';
import Modal from '@material-ui/core/Modal';

import Content from './components/Content';

function CustomModal(props) {
  const { isOpen, handleChangeModalStatus } = props;
  return (
    <div onClick={(event) => {
      event.stopPropagation();
    }}>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isOpen}
        onClose={handleChangeModalStatus}
      >
        <div>
          <Content {...props} handleChangeModalStatus={handleChangeModalStatus} />
        </div>
      </Modal>
    </div>
  );
}

export default CustomModal;