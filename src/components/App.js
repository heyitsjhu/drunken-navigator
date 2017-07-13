import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './Navigation/Navigation';
import Footer from './Footer/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Footer />
      </div>
    );
  }
}

export default App;
