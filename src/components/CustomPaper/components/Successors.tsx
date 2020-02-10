import React from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

function Successors({ successors, updateSuccessors, removeSuccessors }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10, paddingBottom: 10 }}>
      {successors.map((successor, index) => (
        <div key={index} style={{ marginTop: 10, display: 'flex' }}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={successor.position}
            onChange={updateSuccessors({ id: index })}
            error={successor.error}
          />
          <IconButton aria-label="delete" onClick={removeSuccessors({ id: index })}>
            <DeleteIcon />
          </IconButton>
        </div>)
      )}
    </div>)
}

export default Successors;