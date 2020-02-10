import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

function Attributes({ attributes, updateAttributes, removeAttributes }) {
  const classes = useStyles();
  return (
    <>
      {attributes.map((attr, index) =>
        <div className={classes.attributes} key={index} style={{}}>
          <div className={classes.attributes__field_position_left} >
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={attr.name}
              onChange={updateAttributes({ id: index, attr: 'name' })}
              error={attr.error[0]}
              className={classes.attributes__input}
            />
          </div>
          <div className={classes.attributes__field_position_right}>
            <TextField
              id="outlined-basic"
              label="Value"
              variant="outlined"
              value={attr.value}
              onChange={updateAttributes({ id: index, attr: 'value' })}
              error={attr.error[1]}
              className={classes.attributes__input}
            />
          </div>
          <IconButton aria-label="delete" onClick={removeAttributes({ id: index })}>
            <DeleteIcon />
          </IconButton>
        </div>
      )}
    </>)
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    attributes: {
      display: 'flex',
      marginTop: 10,
      marginLeft: 10,
      paddingBottom: 10
    },
    attributes__field_position_left: {
      width: 100
    },
    attributes__field_position_right: {
      width: 100,
      paddingLeft: 10
    },
    attributes__input: {}
  }),
);

export default Attributes;
