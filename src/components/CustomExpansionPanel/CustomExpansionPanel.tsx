import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import CustomModal from '../CustomModal/CustomModal';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../store/actions';
import List from './List';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // height: 216,
      flexGrow: 1,
      width: '250px'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    MuiExpansionPanelSummary__content: {
      margin: '0 !important',
      width: '100%',
      paddingLeft: 0
    },
    MuiExpansionPanelSummary__root: {
      paddingLeft: '10px !important'
    },
    MuiIconButton__root: {
      padding: 0,
    }
  }),
);

function CustomExpansionPanel({ position, attrs, parentId }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [isOpen, toggleStateModal] = React.useState(false);
  const dispatch = useDispatch();
  const deleteUser = () => {
    dispatch(removeUser(parentId))
  }
  const handleChangeModalStatus = (status) => (event) => {
    event.stopPropagation();
    toggleStateModal(status)
  }
  return (
    <div className={classes.root} onMouseEnter={() => setDisabled(false)} onMouseLeave={() => setDisabled(true)}>
      <ExpansionPanel expanded={value} onClick={(event) => {
        event.stopPropagation();
        setValue(!value);
      }}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          classes={{ content: classes.MuiExpansionPanelSummary__content, root: classes.MuiExpansionPanelSummary__root }}
        >
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <div style={{ height: '100%', display: 'flex', alignItems: 'center' }} >
              <Typography className={classes.heading}>{position}</Typography>
            </div>
            <div style={{ minWidth: '50px', display: !disabled ? 'flex' : 'none', alignItems: 'center' }}>
              <IconButton
                aria-label="add"
                onClick={handleChangeModalStatus(true)}
                style={{ height: 20, paddingLeft: 0, paddingRight: 0 }}
                classes={{ root: classes.MuiIconButton__root, }}
              >
                <EditIcon color="primary" />
              </IconButton>
              <IconButton
                aria-label="delete"
                style={{ height: 20, paddingLeft: 0, paddingRight: 0 }}
                classes={{ root: classes.MuiIconButton__root, }}
                onClick={deleteUser}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails >
          <div>
            <List attrs={attrs} />
          </div>
          <CustomModal isOpen={isOpen} handleChangeModalStatus={handleChangeModalStatus} parentId={parentId} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

export default CustomExpansionPanel;


