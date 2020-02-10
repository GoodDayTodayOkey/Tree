import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import Tab from '@material-ui/core/Tab';

import CustomTabs from '../../CustomTabs/CustomTabs';
import TabPanel from '../../CustomTabs/components/TabPanel';
import CustomPaper from '../../CustomPaper/CustomPaper';
import { selectModalContent, selectModal } from '../../../store/selectors';

function Content({ parentId, handleChangeModalStatus }) {
  const classes = useStyles();
  const tabs = useSelector(selectModal);
  const modalContent = useSelector(selectModalContent(parentId));
  const makeModalContent = ({ kind, list }) => {
    const typeModal = {
      'attributes': (list) => ({
        list: Object.keys(list[kind]).map(child => ({ name: child, value: list[kind][child], error: false }))
      }),
      'children': (list) => ({
        list: list['data'].filter(user => list[kind].some(id => user.id === id)).map(user => ({ id: user.id, position: user.position, error: false }))
      }),
    };
    return typeModal[kind](list);
  }
  const makeBar = () => tabs.map((tab, index) => <Tab key={index} label={tab} {...accessibilityProps(index)} />);
  const makePanel = (value) => tabs.map((tab, index) => (
    <TabPanel key={index} value={value} index={index}>
      <CustomPaper
        kind={tab}
        toggleStateModal={handleChangeModalStatus}
        parentId={parentId}
        list={makeModalContent({ kind: tab, list: modalContent })}
      />
    </TabPanel>));

  const accessibilityProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <div className={classes.content}>
      <div className={classes.content__item} style={{}}>
        <IconButton aria-label="delete" onClick={handleChangeModalStatus(false)}>
          <CloseIcon color="error" />
        </IconButton>
      </div>
      <CustomTabs
        makeBar={makeBar}
        makePanel={makePanel}
      />
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      position: 'absolute',
      width: 388,
      maxHeight: 500,
      height: '100%',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    content__item: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end'
    }

  }),
);

export default Content;