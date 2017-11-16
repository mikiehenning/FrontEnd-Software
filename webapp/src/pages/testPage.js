import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router';
//import { PropAPI } from '../api'

import {
    Container, InputBox, HelpmMessage, LoginForm, SubButton, InputGroup,
    AuthPage, WelcomeParagraph, InputField, StackedInputs, SubmitButton
} from '../styleForm';



/*export default class TestPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            error: props.error,
            info: props.info,
            password: ''
        };
    }*/

const testPage = () => (
    <div>
            <AuthPage subtitle="Sign in to Corstata">
                <StackedInputs>

                    <InputField
                        type="email"
                        name="uname"
                        id="username"
                      //  value="test"//{this.state.email}
                      //  onInput="test"//{this.changeUsername}
                        placeholder="Email address"
                        required
                        autoFocus
                    />
                    <InputGroup>
                        <InputField
                            type="password"
                            name="password"
                           // onInput="test"//{this.changePassword}
                            placeholder="Password"
                            required
                        />
                        <SubmitButton to="testPage2">
                            <i className="fa fa-sign-in fa-lg" />
                        </SubmitButton>

                    </InputGroup>
                </StackedInputs>

                <HelpmMessage>Corstra Login Page</HelpmMessage>
            </AuthPage>
        </div>
   )
export default testPage
//}