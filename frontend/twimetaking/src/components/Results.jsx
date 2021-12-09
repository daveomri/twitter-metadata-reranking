/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import {
  Grid,
} from '@material-ui/core';

import Tweet from './Tweet';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  tweet: {
    borderLeft: '1px solid #c0c0c4',
    borderRight: '1px solid #c0c0c4',
    borderBottom: '1px solid #c0c0c4',
  },
});

const Results = (props) => {
  const { data, classes } = props;

  return (
    <Grid container>
      {data.map((tweet) => (
        <Grid item xs={12} className={classes.tweet} key={tweet.id_str}>
          <Tweet data={tweet} />
        </Grid>
      ))}
    </Grid>
  );
};

Results.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles(styles)(Results);
