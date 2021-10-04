import './App.css';
import { useState, useEffect } from 'react';
import TestPage from "./components/TestPage";

function App() {
  const [initialState, setState] = useState([]);

  useEffect(() => {
    fetch('/api').then(response => 
      response.json().then(data => {
        setState(data);
      }));
  }, []);
  
  return (
    <div className="App">
      <TestPage data={initialState} />
    </div>
  );
}

export default App;
