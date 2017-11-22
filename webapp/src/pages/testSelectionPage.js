import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './home.css'

class testSelectionPage extends Component {
    render() {
        return (
            <div className="classContainer">
                <label>Which test do you wish to perform?</label>
                    <Link className='button' to='./'>Pressure Wound Test</Link>
                    <Link className='button' to='./wagnerScaleTest'>Wagner Scale Test</Link>
                    <Link className='button' to='./MNAtest'>Mini-Nutritional Assessment</Link>
                    <Link className='button' to='./'>Pressure Wounds Test</Link>
                    <Link className='button' to='./bates'> Bates Jensen Wound Assessment</Link>
            </div>
        );
    };
}
export default testSelectionPage