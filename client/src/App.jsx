import React from 'react';
import logo from './logo.svg';
import './App.css';
import TesteComJs from './components/TesteComJs';
import TesteComTx from './components/TesteComTs';

const App = () => {
  return (
    <div className="App">
      <TesteComJs />
      <TesteComTx />
    </div>
  );
}

export default App;
