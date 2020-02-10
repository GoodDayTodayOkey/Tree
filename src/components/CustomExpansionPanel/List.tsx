import React from 'react';
import Typography from '@material-ui/core/Typography';

function List({ attrs }) {
  return (
    <>{Object.keys(attrs).map((attr, i) => (<Typography key={i}>{`${attr} : ${attrs[attr]}`}</Typography>))}</>
  );
}

export default List;