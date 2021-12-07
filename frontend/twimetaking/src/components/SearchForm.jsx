/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-curly-brace-presence */
import React, { useState, Fragment } from 'react';
import PropTypes, { number } from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import {
  TextField,
  Button,
  Grid,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@material-ui/core';

const styles = (theme) => ({
  paper: {
    width: '100%',
    backgroundColor: '#fafaff',
    padding: '0',
    margin: '0',
    borderLeft: '1px solid #c0c0c4',
    borderRight: '1px solid #c0c0c4',
    marginBottom: theme.spacing(1),
  },
});

const defaultValues = {
  hashtags: '',
  people: '',
  resPerQuer: 10,

  time: '',
  timeWeight: 0,

  date: '',
  dateWeight: 0,

  likes: 0,
  likesWeight: 0,

  retweets: 0,
  retweetsWeight: 0,

  length: 0,
  lengthWeight: 0,

  contains: '',
  similarity: 'words',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // call parent
    // Change format of date
    let outData = { ...formValues };
    if (outData.date !== '') {
      const date = new Date(outData.date);
      const fullDate = date.toLocaleDateString(
        'en-GB',
        {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        },
      );
      outData = { ...outData, date: fullDate };
    }
    onSubmit(outData);
  };

  return (
    <div className={classes.paper}>
      <form onSubmit={handleSubmit}>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={10}>
            <h4>Search by</h4>
          </Grid>
          <Grid item xs={10}>
            <TextField
              fullWidth
              id="hashtags-input"
              name="hashtags"
              label="Hashtags"
              type="text"
              value={formValues.hashtags}
              onChange={handleInputChange}
              multiline
              maxRows={4}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              fullWidth
              id="people-input"
              name="people"
              label="People"
              type="text"
              value={formValues.people}
              onChange={handleInputChange}
              multiline
              maxRows={4}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              fullWidth
              required
              id="results-per-query"
              name="resPerQuer"
              label="Results per query"
              type="number"
              value={formValues.resPerQuer}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { min: 0, max: 100 } }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={10}><h4>Custom search</h4></Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              required
              label="Tweet date"
              type="date"
              name="date"
              value={formValues.date}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              required
              label="Weight"
              type="number"
              name="dateWeight"
              value={formValues.dateWeight}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { min: 0 } }}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={8}>
            <TextField
              fullWidth
              required
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
          <Grid item xs={2}>
            <TextField
              fullWidth
              required
              label="Weight"
              type="number"
              name="timeWeight"
              value={formValues.timeWeight}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { min: 0 } }}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={8}>
            <TextField
              fullWidth
              required
              id="likes-num"
              name="likes"
              label="Likes"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              value={formValues.likes}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              required
              label="Weight"
              type="number"
              name="likesWeight"
              value={formValues.likesWeight}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { min: 0 } }}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={8}>
            <TextField
              fullWidth
              required
              id="retweets-num"
              name="retweets"
              label="Retweets"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              value={formValues.retweets}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              required
              label="Weight"
              type="number"
              name="retweetsWeight"
              value={formValues.retweetsWeight}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { min: 0 } }}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={8}>
            <TextField
              fullWidth
              required
              id="Length-num"
              name="length"
              label="Tweet length"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              value={formValues.length}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              required
              label="Weight"
              type="number"
              name="lengthWeight"
              value={formValues.lengthWeight}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { min: 0 } }}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={10}>
            <TextField
              fullWidth
              id="contains"
              name="contains"
              label="Tweet contains"
              type="text"
              value={formValues.contains}
              onChange={handleInputChange}
              multiline
              maxRows={4}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={10}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Similarity</FormLabel>
              <RadioGroup
                aria-label="text similarity"
                defaultValue="words"
                name="similarity"
                id="similarity"
                value={formValues.similarity}
                onChange={handleInputChange}
              >
                <FormControlLabel value="words" control={<Radio />} label="Bag of words" />
                <FormControlLabel value="cosine" control={<Radio />} label="Cosine similarity" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              type="submit"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

SearchForm.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles(styles)(SearchForm);
