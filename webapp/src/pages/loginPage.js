import React, { Component } from 'react'
import 'font-awesome/css/font-awesome.min.css'
import { Link, Redirect, Route } from 'react-router-dom'

//import styled from 'styled-components';

import {
    Container, InputBox, HelpmMessage, LoginForm, SubButton, InputGroup,
    AuthPage, WelcomeParagraph, InputField, StackedInputs, SubmitButton
} from '../styleForm';

class loginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            error: props.error,
            info: props.info,
            password: ''
        };
    }

    checkInput() {
        <Redirect to="/" />
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
                        placeholder="email@gmail.com"
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

                        <SubmitButton onClick={this.checkInput}>
                            <i className="fa fa-sign-in fa-lg" />
                            <Link to='./'> </Link>
                        </SubmitButton>

                    </InputGroup>
                </StackedInputs>

                <HelpmMessage>Corstra Navigation Page</HelpmMessage>
            </AuthPage>
        );
    };
}
export default loginPage;