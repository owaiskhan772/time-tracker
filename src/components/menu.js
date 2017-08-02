'use strict'
import React from 'react';
import { Navbar } from 'react-bootstrap';

const Menu = () => {
  return(
    <Navbar inverse fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">Time-Tracker</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
    </Navbar>
  );
}

export default Menu;
