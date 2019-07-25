import React from 'react';
import logo from './logo.svg'
import Particles from './component/particles';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Particles></Particles>
      <hr></hr>
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
    </div>
  );
}

export default App;
