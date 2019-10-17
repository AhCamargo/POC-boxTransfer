import React, { Component } from 'react'

// Styles
import './style.css'

export default class SpaceshipWrapper extends Component {
   render() { 
        return (
        <div className="spaceship-wrapper">
            <div className="spaceship"></div>
            <div className="front"></div>
            <div className="window"></div>
            <div className="wings"></div>
            <div className="engine"></div>
            <div className="flames"></div>

        </div>
        );
   }
}