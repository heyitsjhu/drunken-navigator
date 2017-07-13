import React, { Component } from 'react';

import data from '../../data/nav-items.json';
import './navigation.css';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  componentDidMount() {
    let listItemsPopUpText = [
      document.querySelector(".instructions__text"),
      document.querySelector(".about-chip__text"),
      document.querySelector(".about-the-house__text")
    ]
    /* 
      When window width is equal to or less than 800px, calculates the distance needed to offset item from bottom of page and applies it to the item's CSS 'top' property.
    */
    listItemsPopUpText.forEach(function(item) {
      let footerHeight = document.querySelector(".footer").clientHeight;
      item.addEventListener("mouseenter", function() {
        if(window.innerWidth < 801) {
          this.style.top = -(this.clientHeight + (footerHeight * 0.75)) + "px";
        }
      });
    });
    /* 
      When window width is greater than 800px, checks and changes item's 'top' CSS property to '0px'.
    */
    window.addEventListener("resize", function() {
      if(window.innerWidth > 800) {
        listItemsPopUpText.forEach(function(item) {
          if(item.style.top !== "0px") {
            item.style.top = 0;
          }
        });
      }
    });
  }
  render() {
    return ( 
      <header>
        <div className="navbar">
          <div className="navbar__title">Drunken Navigator</div>
          <nav className="navbar__nav">
            <ul className="navbar__list">
              {Object.keys(data).map((item, index) => {
                return (
                  <li className="navbar__list-item" id={data[item]["id"]} key={index}>
                    {item}
                    <div className={data[item]["class"]}>
                      {data[item]["text"].map((text, index) => {
                        return (
                          <p key={index}>{text}</p>
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