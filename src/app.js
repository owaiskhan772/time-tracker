import React, { Component } from 'react';

import Menu from './components/menu';
import Footer from './components/footer';

export default class App extends Component {
  render() {
    return (
      <div>
        <Menu />
          { this.props.children }
        <Footer />
      </div>
    );
  }
}
