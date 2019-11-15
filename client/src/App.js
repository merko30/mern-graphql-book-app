import React, { Component } from "react";

import Navbar from "./components/Navbar";

import Routes from "./routes/Routes";

class App extends Component {
  render() {
    return (
      <div className="container mx-auto h-full">
        <Navbar />
        <Routes />
      </div>
    );
  }
}

export default App;
