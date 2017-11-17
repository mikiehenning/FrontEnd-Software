import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ResponseLabel from './responseLabel'
import './home.css'


class wagnerScaleTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            input: "0",
            info: " ",
        };
    }

    changeInput(input) {
        this.setState({input});
    }

    render() {
        return (
            <div className="container">

                <div className="logo">LOGO</div>

                <form id="wagnerForm" action="#" method="POST" encType="multipart/form-data">
                    <br />
                    <div className="row">
                        <label className="lab">Select the option that best describes the situation</label><br />
                        <input type="radio" name="WSD" value="0" defaultChecked /> Ulcers have intact skin <br />
                        <input type="radio" name="WSD" value="1" /> Ulcers are superficial <br />
                        <input type="radio" name="WSD" value="2" /> Ulcers are deeper, and may extend to tendons or bones  <br />
                        <input type="radio" name="WSD" value="3" /> Ulcers contain an abscess or osteomyelitis <br />
                        <input type="radio" name="WSD" value="4" /> Ulcers have gangrene of the forefoot  <br />
                        <input type="radio" name="WSD" value="5" /> Ulcers have gangrene of a major portion of the foot<br />
                    </div>
                    {/* potentially swap this submit button out for an actual link button with a function to interface to the backend*/}
                    <input id="submit_button" type="submit" value="Sumbit form" />
                </form>
                <ResponseLabel changeInput={this.changeInput.bind(this)} input="2" />
                {/* show test feedback here based upon what they select*/}
            </div>

        );
    };
}
export default wagnerScaleTest