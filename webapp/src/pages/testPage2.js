import React, { Component } from 'react';
import logo from './logo.svg';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';

//import styled from 'styled-components';

import {
    Container, InputBox, HelpmMessage, LoginForm, SubButton, InputGroup,
    AuthPage, WelcomeParagraph, InputField, StackedInputs, SubmitButton
} from './styleForm';

class TestPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            error: props.error,
            info: props.info,
            password: ''
        };
    }


    render() {
        return (
            <AuthPage subtitle="Navigating to Home Page">
                <StackedInputs>

                    <InputField
                        type="email"
                        name="uname"
                        id="username"
                        value={this.state.email}
                        onInput={this.changeUsername}
                        placeholder="Email address"
                        required
                        autoFocus
                    />
                    <InputGroup>
                        <InputField
                            type="password"
                            name="password"
                            onInput={this.changePassword}
                            placeholder="Password"
                            required
                        />
                        <SubmitButton>
                            <i className="fa fa-sign-in fa-lg" />
                        </SubmitButton>

                    </InputGroup>
                </StackedInputs>

                <HelpmMessage>Corstra Navigation Page</HelpmMessage>
            </AuthPage>
        );
    }; //no semi colon here before
}
export default TestPage2;