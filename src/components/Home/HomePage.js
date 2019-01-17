import React, { Component } from 'react';
import Auth from './Auth';

export default class HomePage extends Component {
  render() {
    return (
      <div className='homepage-component-container'>
          <h1 className='homepage-title'>Adventure Squad</h1>
          <div className='homepage-content'>
            <div className='homepage-subtitles'>
              <h3 className='homepage-subtitle'>Exploration.</h3>
              <h3 className='homepage-subtitle subtitle-1'>Simplified.</h3>
            </div>
            <div className='homepage-button-container'>
              <Auth />
            </div>
          </div>
      </div>
    )
  }
}