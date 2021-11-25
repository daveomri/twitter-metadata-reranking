/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import { Paper } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
});

const Results = (props) => {
  const { data } = props;
  return (
    <Paper>
      {data}
    </Paper>
  );
};

Results.propTypes = {
  data: PropTypes.string.isRequired,
};

export default withStyles(styles)(Results);
