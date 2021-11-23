import React, { useState, useEffect } from 'react';

import { Button } from '@material-ui/core';
import './App.css';

import TestPage from './components/TestPage';

function App() {
  const [initialState, setState] = useState([]);

  useEffect(() => {
    fetch('/api').then((response) => response.json().then((data) => {
      setState(data);
    }));
  }, []);

  return (
    <div className="App">
      <TestPage data={initialState} />
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
    </div>
  );
}

export default App;
