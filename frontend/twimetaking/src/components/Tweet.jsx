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

const Tweet = (props) => {
  const { data } = props;
  return (
    <Paper>
      {data.timeWeight}
    </Paper>
  );
};

Tweet.propTypes = {
  data: PropTypes.string.isRequired,
};

export default withStyles(styles)(Tweet);
