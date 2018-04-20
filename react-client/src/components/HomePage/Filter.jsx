import React from 'react';
import { FlatButton, Paper } from 'material-ui';

const Filter = ({updatePrice1, updatePrice2, updatePrice3, updatePrice4}) => {
  return (
    <Paper>
      Filter
      <FlatButton
        label='$'
        onClick={updatePrice1}
      />
      <FlatButton
        label='$$'
        onClick={updatePrice2}
      />
      <FlatButton
        label='$$$'
        onClick={updatePrice3}
      />
      <FlatButton
        label='$$$$'
        onClick={updatePrice4}
      />
    </Paper>
  )
}

export default Filter;