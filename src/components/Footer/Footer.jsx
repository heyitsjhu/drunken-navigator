import React, { Component } from 'react';

import './footer.css';

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="footer">
          <div>
            A simple HTML game built using vanilla JavaScript. Created by 
            <a href="https://github.com/heyitsjhu" 
              rel="noopener noreferrer" 
              target="_blank">
              Johnny Hu
            </a>.
          </div>
          <a href="https://github.com/heyitsjhu/drunken-navigator" 
            rel="noopener noreferrer" 
            target="_blank">
            GitHub Repository
          </a>
        </div>
      </footer>
    )
  }
}