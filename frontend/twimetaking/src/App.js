import './App.css';
import { useState, useEffect } from 'react';
import TestPage from "./components/TestPage";

function App() {
  const [initialState, setState] = useState([]);
  const url = '/api';

  useEffect(() => {
    fetch(url).then(response => {
      if (response.status === 200) {
        return response.json();
      }
    }).then(data => setState(data));
  });
  
  return (
    <div className="App">
      <TestPage data={initialState} />
    </div>
  );
}

export default App;
