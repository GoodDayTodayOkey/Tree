import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

function Attributes({ attributes, updateItem, removeItem }) {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        '& > *': {
          margin: theme.spacing(1),
          width: 100,
        },
      },
    }),
  );

  return (
    <>
      {attributes.map((attr, index) =>
        <div style={{ display: 'flex', marginTop: 10, marginLeft: 10, paddingBottom: 10 }}>
          <div style={{ width: 100 }}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={attr.name}
              onChange={updateItem({ id: index, attr: 'name' })}
              error={attr.error[0]}
            />
          </div>
          <div style={{ width: 100, paddingLeft: 10 }}>
            <TextField
              id="outlined-basic"
              label="Value"
              variant="outlined"
              value={attr.value}
              onChange={updateItem({ id: index, attr: 'value' })}
              error={attr.error[1]}
            />
          </div>
          <IconButton aria-label="delete" onClick={removeItem({ id: index })}>
            <DeleteIcon />
          </IconButton>
        </div>
      )}
    </>)
}

export default Attributes;
