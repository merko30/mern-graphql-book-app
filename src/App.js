import React, { Component } from 'react';

import Navbar from './components/Navbar/Navbar';

import Routes from './routes/Routes';

import './App.css';


class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    );
  }
}

export default App;
