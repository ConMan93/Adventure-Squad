import React, { Component } from 'react';
import Auth from './Auth';
import {ReactComponent as Plane} from '../../photos/plane.svg';
import {ReactComponent as Travelers} from '../../photos/travelers.svg';
import {ReactComponent as Blob} from '../../photos/blob.svg';

export default class HomePage extends Component {
  render() {
    return (
      <div className='homepage-component-container'>
      <Blob className='blob'/>
          <h1 className='homepage-title'>Adventure Squad</h1>
          <div className='homepage-content'>
            <Travelers className='travelers'/>
            <Plane className='plane'/>
            <div className='homepage-subtitles'>
              <h3 className='homepage-subtitle'>Exploration.</h3>
              <h3 className='homepage-subtitle subtitle-1'>Simplified.</h3>
            </div>
            <div className='homepage-button-container'>
              <Auth />
              <div className='button-border'></div>
            </div>
          </div>
      </div>
    )
  }
}