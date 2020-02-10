import React from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

function Successors({ successors, updateSuccessors, removeSuccessors }) {
  const classes = useStyles();
  return (
    <div className={classes.successors} style={{}}>
      {successors.map((successor, index) => (
        <div className={classes.successors__field} key={index} style={{}}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={successor.position}
            onChange={updateSuccessors({ id: index })}
            error={successor.error}
            className={classes.successors__input}
          />
          <IconButton aria-label="delete" onClick={removeSuccessors({ id: index })}>
            <DeleteIcon />
          </IconButton>
        </div>)
      )}
    </div>)
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    successors: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: 10,
      paddingBottom: 10
    },
    successors__field: {
      marginTop: 10,
      display: 'flex'
    },
    successors__input: {},
  }),
);

export default Successors;