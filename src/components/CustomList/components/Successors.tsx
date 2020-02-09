import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
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

function Successors({ successors, updateItem, removeItem }) {
  const classes = useStyles();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10, paddingBottom: 10 }}>
      {successors.map((successor, index) => (
        <div style={{ marginTop: 10, display: 'flex' }}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={successor.position}
            onChange={updateItem({ id: index })}
            error={successor.error}
          />
          <IconButton aria-label="delete" onClick={removeItem({ id: index })}>
            <DeleteIcon />
          </IconButton>
        </div>)
      )}
    </div>)
}


export default Successors;