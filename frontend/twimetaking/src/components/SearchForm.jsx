/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-curly-brace-presence */
import React, { useState } from 'react';
import PropTypes, { number } from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import {
  Paper,
  TextField,
  Button,
  Grid,
} from '@material-ui/core';

const styles = (theme) => ({
  paper: {
    width: '100%',
    backgroundColor: 'pink',
  },
});

const defaultValues = {
  hashtags: '',
  people: '',

  time: '',
  timeWeight: 0,

  date: '',
  dateWeight: 0,

  likes: 0,
  likesWheight: 0,

  retweets: 0,
  retweetsWeight: 0,

  comments: 0,
  commentsWeight: 0,

  length: 0,
  lengthWeight: 0,

  contains: '',
};

const SearchForm = (props) => {
  // eslint-disable-next-line react/prop-types
  const { onSubmit, classes } = props;
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <Paper className={classes.paper}>
      <form onSubmit={onSubmit}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <h4>Search by</h4>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="hashtags-input"
              name="hashtags"
              label="Hashtags"
              type="text"
              value={formValues.hashtags}
              onChange={handleInputChange}
              multiline
              maxRows={4}
              variant="filled"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="people-input"
              name="people"
              label="People"
              type="text"
              value={formValues.people}
              onChange={handleInputChange}
              multiline
              maxRows={4}
              variant="filled"
            />
          </Grid>
          <Grid item xs={12}><h4>Custom search</h4></Grid>
          <Grid item xs={12}>
            <TextField
              label="Tweet date"
              type="date"
              name="date"
              value={formValues.date}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Tweet time"
              type="time"
              name="time"
              value={formValues.time}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                step: 300, // 5 min
              }}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="likes-num"
            name="likes"
            label="Likes"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            value={formValues.likes}
            onChange={handleInputChange}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="retweets-num"
            name="retweets"
            label="Retweets"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            value={formValues.retweets}
            onChange={handleInputChange}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="comments-num"
            name="comments"
            label="Comments"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            value={formValues.comments}
            onChange={handleInputChange}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="Length-num"
            name="length"
            label="Tweet length"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            value={formValues.length}
            onChange={handleInputChange}
            variant="filled"
          />
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Paper>
  );
};

SearchForm.propTypes = {
  data: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles(styles)(SearchForm);
