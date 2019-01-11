import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
  render() {
    return (
      <div>
          <Link to='/login' >Login</Link>
          <Link to='/trip' >Trips</Link>
      </div>
    )
  }
}
