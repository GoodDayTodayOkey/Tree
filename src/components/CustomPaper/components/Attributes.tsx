import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

function Attributes({ attributes, updateAttributes, removeAttributes }) {
  return (
    <>
      {attributes.map((attr, index) =>
        <div key={index} style={{ display: 'flex', marginTop: 10, marginLeft: 10, paddingBottom: 10 }}>
          <div style={{ width: 100 }}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={attr.name}
              onChange={updateAttributes({ id: index, attr: 'name' })}
              error={attr.error[0]}
            />
          </div>
          <div style={{ width: 100, paddingLeft: 10 }}>
            <TextField
              id="outlined-basic"
              label="Value"
              variant="outlined"
              value={attr.value}
              onChange={updateAttributes({ id: index, attr: 'value' })}
              error={attr.error[1]}
            />
          </div>
          <IconButton aria-label="delete" onClick={removeAttributes({ id: index })}>
            <DeleteIcon />
          </IconButton>
        </div>
      )}
    </>)
}

export default Attributes;
