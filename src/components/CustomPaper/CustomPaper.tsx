const uuidv1 = require('uuid/v1');
import React from 'react';
import { useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import CustomInputsList from './components/CustomInputsList';
import { updateUser } from '../../store/actions';

function CustomPaper({ kind, list, parentId, toggleStateModal }) {
  const { list: initialState } = list;
  const [state, setState] = React.useState(initialState);
  const dispatch = useDispatch();

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
    <div style={{ height: 345, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Paper style={{ maxHeight: 300, overflow: 'auto' }} >
        <CustomInputsList kind={kind} list={list} state={state} setState={setState} />
      </Paper>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', height: 35, marginTop: 10, alignItems: 'center' }}>
        <IconButton
          aria-label="add"
          size="medium"
          onClick={addInputsLine}
        >
          < AddCircleIcon color="primary" />
        </IconButton>
        <Button variant="contained" color="primary" href="#contained-buttons" onClick={saveInputsValue}>
          Save
        </Button>
      </div>
    </div>)
}

export default CustomPaper;