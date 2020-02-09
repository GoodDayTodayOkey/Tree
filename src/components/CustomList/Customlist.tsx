import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Attributes from './components/Attributes';
import Successors from './components/Successors';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/actions';
const uuidv1 = require('uuid/v1');

function CustomList({ kind, list, parentId, toggleStateModal }) {
  const { list: params } = list;
  const [state, setState] = React.useState(params);
  const dispatch = useDispatch();
  const getTypeList = (kind, list) => {
    const typeList = {
      'attributes': () => (
        <Attributes
          attributes={state}
          updateItem={({ id, attr }) => (event) => {
            const newState = [...state.map((item, index) => index === id ? { ...item, [attr]: event.target.value } : item)];
            setState(newState);
          }}
          removeItem={({ id }) => () => {
            const newState = [...state.filter((_, index) => id !== index)];
            setState(newState);
          }}
        />),
      'children': () => (
        <Successors
          successors={state}
          updateItem={({ id }) => (event) => {
            const newState = [...state.map((item, index) => index === id ? { ...item, position: event.target.value } : item)];
            setState(newState);
          }}
          removeItem={({ id }) => () => {
            const newState = [...state.filter((_, index) => id !== index)];
            setState(newState);
          }}
        />),
    }
    return typeList[kind](list);
  }
  return (
    <div style={{ height: 345, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Paper style={{ maxHeight: 300, overflow: 'auto' }} >
        {getTypeList(kind, list)}
      </Paper>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', height: 35, marginTop: 10, alignItems: 'center' }}>
        <IconButton
          aria-label="add"
          size="medium"
          onClick={() => {
            const newState = kind === 'children' ? [...state, { id: uuidv1(), position: '', error: false }] : [...state, { name: '', value: '', error: [false, false] }];
            setState(newState);
          }}
        >
          < AddCircleIcon color="primary" />
        </IconButton>
        <Button variant="contained" color="primary" href="#contained-buttons" onClick={() => {
          if (kind === 'attributes') {
            if (state.every(item => item.name !== '' && item.value !== '')) {
              dispatch(updateUser({ state, kind, parentId }));
              toggleStateModal(false);
            }
            setState(state.map(item => item.name !== '' && item.value !== '' ? item : { ...item, error: [item.name === '', item.value === ''] }))
          } else {
            if (state.every(item => item.position !== '')) {
              dispatch(updateUser({ state, kind, parentId }));
              toggleStateModal(false);
            }
            const m = state.map(item => item.position !== '' ? item : { ...item, error: item.position === '' });
            debugger;
            setState(state.map(item => item.position !== '' ? item : { ...item, error: item.position === '' }))
          }
        }}>
          Save
        </Button>
      </div>
    </div>)
}


export default CustomList;