import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { VendingMachine } from './pages/VendingMachine';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Login /> }/>
        <Route path="/vending-machine" element={ <VendingMachine /> } />
      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
