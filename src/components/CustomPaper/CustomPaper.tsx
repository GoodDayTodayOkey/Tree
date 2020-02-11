const uuidv1 = require('uuid/v1');
import React from 'react';
import { useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import CustomInputsList from './components/CustomInputsList';
import { updateUser } from '../../store/actions';


function CustomPaper({ kind, list, parentId, toggleStateModal }) {
  const { list: initialState } = list;
  const [state, setState] = React.useState(initialState);
  const dispatch = useDispatch();
  const classes = useStyles();

  const addInputsLine = () => {
    const newState = kind === 'children'
      ? [...state, { id: uuidv1(), position: '', error: false }]
      : [...state, { name: '', value: '', error: [false, false] }];
    setState(newState);
  };

  const saveInputsValue = (event) => {
    if (kind === 'attributes') {
      const hasNotEmptyAttributes = state.every(item => item.name !== '' && item.value !== '');
      if (hasNotEmptyAttributes) {
        dispatch(updateUser({ state, kind, parentId }));
        toggleStateModal(false)(event);
      }
      setState(state.map(item => item.name !== '' && item.value !== '' ? item : { ...item, error: [item.name === '', item.value === ''] }))
    } else {
      const hasNotEmptyChildren = state.every(item => item.position !== '');
      if (hasNotEmptyChildren) {
        dispatch(updateUser({ state, kind, parentId }));
        toggleStateModal(false)(event);
      }
      setState(state.map(item => item.position !== '' ? item : { ...item, error: item.position === '' }))
    }
  }

  return (
    <div className={classes.paper}>
      <Paper className={classes.paper__item} >
        <CustomInputsList kind={kind} list={list} state={state} setState={setState} />
      </Paper>
      <div className={classes.paper__controls}>
        <IconButton
          aria-label="add"
          size="medium"
          onClick={addInputsLine}
        >
          < AddCircleIcon color="primary" />
        </IconButton>
        <Button variant="contained" color="primary" href="#contained-buttons" onClick={saveInputsValue}>
          Save {`${kind}`}
        </Button>
      </div>
    </div>)
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      height: 345,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    paper__item: {
      maxHeight: 300,
      overflow: 'auto'
    },
    paper__controls: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      height: 35,
      marginTop: 10,
      alignItems: 'center'
    },
  }),
);

export default CustomPaper;