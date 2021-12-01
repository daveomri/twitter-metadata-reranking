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
    paddingBottom: theme.spacing(2),
  },
});

function App(props) {
  const [state, setState] = useState(null);
  const { classes } = props;

  // useEffect(() => {
  //   fetch('/api').then((response) => response.json().then((data) => {
  //     setState(data);
  //   }));
  // }, []);

  const handleSubmit = (data) => {
    console.log(data);

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
        <Grid item md={6} sm={8} xs={12}>
          <SearchForm onSubmit={handleSubmit} />
        </Grid>
        <Grid item xs={6}>
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
