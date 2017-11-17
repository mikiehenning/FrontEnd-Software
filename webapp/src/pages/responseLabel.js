import React, { Component } from 'react'

class responseLabel extends Component {
    handleChange(e) {
        const input = e.target.value;
        this.props.changeInput();
    }

    render() {
        
        return (
            <div>
                <label>{this.props.input}</label>
                <input type="radio" onClick={this.handleChange.bind(this)} name="WSD" value="2" /> Ulcers are deeper, and may extend to tendons or bones  < br />
                <input type="radio" onClick={this.handleChange.bind(this)} name="WSD" value="3" /> Ulcers contain an abscess or osteomyelitis < br />

            </div>
        );
    };
}
export default responseLabel