/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';

import SearchForm from './components/SearchForm';
import Results from './components/Results';
import Footer from './components/Footer';

const styles = (theme) => ({
  root: {
    backgroundColor: '#fafafa',
    minHeight: '100vh',
    height: '100%',
    paddingBottom: theme.spacing(1),
  },
  form: {
    borderLeft: '1px solid #c0c0c4',
    borderRight: '1px solid #c0c0c4',
  },
});

function App(props) {
  const [state, setState] = useState(null);
  const { classes } = props;

  const handleSubmit = (data) => {
    fetch('/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((ddata) => {
      fetch('/api').then((r) => r.json().then((dddata) => {
        setState(dddata);
      }));
    });
  };

  return (
    <div>
      <Grid
        container
        justifyContent="center"
        direction="column"
        alignItems="center"
        className={classes.root}
      >
        <Grid
          item
          md={6}
          sm={8}
          xs={12}
          className={classes.form}
        >
          <SearchForm onSubmit={handleSubmit} />
        </Grid>
        <Grid
          item
          md={6}
          sm={8}
          xs={12}
        >
          {
            state && (<Results data={state} />)
          }
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

/**
      <Button
        onClick={async () => {
          const newData = {
            name: 'Dave Liborius',
            rtl: 'Im not quite sure',
          };

          const response = await fetch('/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
          });
          if (response.ok) {
            console.log('response worked');
            fetch('/api').then((r) => r.json().then((data) => {
              setState(data);
            }));
          }
        }}
      >
        submit
      </Button>
 */

App.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles(styles)(App);
