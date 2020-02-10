import React from 'react';

import Attributes from './Attributes';
import Successors from './Successors';

function CustomInputsList({ kind, list, state, setState }) {
  const getTypeList = (kind, list) => {
    const typeList = {
      'attributes': () => {
        const updateAttributes = ({ id, attr }) => (event) => {
          const newState = [...state.map((item, index) => index === id ? { ...item, [attr]: event.target.value } : item)];
          setState(newState);
        };
        const removeAttributes = ({ id }) => () => {
          const newState = [...state.filter((_, index) => id !== index)];
          setState(newState);
        };
        return (
          <Attributes
            attributes={state}
            updateAttributes={updateAttributes}
            removeAttributes={removeAttributes}
          />)
      },
      'children': () => {
        const updateSuccessors = ({ id }) => (event) => {
          const newState = [...state.map((item, index) => index === id ? { ...item, position: event.target.value } : item)];
          setState(newState);
        };
        const removeSuccessors = ({ id }) => () => {
          const newState = [...state.filter((_, index) => id !== index)];
          setState(newState);
        };
        return (
          <Successors
            successors={state}
            updateSuccessors={updateSuccessors}
            removeSuccessors={removeSuccessors}
          />)
      },
    }
    return typeList[kind](list);
  }
  return <>{getTypeList(kind, list)}</>
}

export default CustomInputsList;