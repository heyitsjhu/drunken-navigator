import React, { Component } from 'react';

import data from '../../data/nav-items.json';
import './navigation.css';

export default class Navigation extends Component {
  render() {
    return ( 
      <header>
        <div className="navbar">
          <div className="navbar__title">Drunken Navigator</div>
          <nav className="navbar__nav">
            <ul className="navbar__list">
              {Object.keys(data).map((item) => {
                return (
                  <li className="navbar__list-item" id={data[item].id}>
                    {item}
                    <div className="instructions__text">
                      {data[item]["text"].map((text) => {
                        return (
                          <p>{text}</p>
                        )
                      })}
                    </div>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </header>
    )
  }
}