import React, { Children } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import getModalStyle from '../../helpers/getModalStyle';
import accessibilityProps from '../../helpers/accessibilityProps';
import Tab from '@material-ui/core/Tab';
import CustomTabs from '../CustomTabs/CustomTabs';
import TabPanel from '../CustomTabs/components/TabPanel';
import CustomList from '../CustomList/Customlist';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 388,
      maxHeight: 500,
      height: '100%',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

function CustomModal({ isOpen, toggleStateModal, parentId }) {
  const tabs = useSelector(state => state.tabs.data.modal);
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const list = useSelector(state => ({
    attributes: state.users.data.find(item => item.id === parentId).attributes,
    children: state.users.data.find(item => item.id === parentId).children,
    data: state.users.data,
  }));
  const getListParams = ({ kind, list }) => {
    const typeList = {
      'attributes': (list) => ({ id: parentId, list: Object.keys(list[kind]).map(child => ({ name: child, value: list[kind][child], error: false })) }),
      'children': (list) => ({
        parentId: parentId,
        list: list['data'].filter(user => list[kind].some(id => user.id === id)).map(user => ({ id: user.id, position: user.position, error: false })),
      }),
    }
    return typeList[kind](list);
  };
  return (
    <div onClick={(event) => {
      event.stopPropagation();
    }}>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isOpen}
        onClose={() => toggleStateModal(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton aria-label="delete" onClick={(event) => { event.stopPropagation(); toggleStateModal(false) }}>
              <CloseIcon color="error" />
            </IconButton>
          </div>
          <CustomTabs
            bar={() => tabs.map((tab, index) => <Tab key={index} label={tab} {...accessibilityProps(index)} />)}
            panel={(value) => tabs.map((tab, index) => (
              <TabPanel key={index} value={value} index={index}>
                <CustomList kind={tab} toggleStateModal={toggleStateModal} parentId={parentId} list={getListParams({ kind: tab, list })} />
              </TabPanel>)
            )}
          />
        </div>
      </Modal>
    </div>
  );
}

export default CustomModal;