import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home';
import testPage from './testPage';
import searchPatient from './searchPatient';
import createPage from './createPage';
import resetPassword from './resetPassword';
import nav from './nav';
// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/testPage' component={testPage} />
            <Route path='/searchPatient' component={searchPatient} />
            <Route path='/createPage' component={createPage} />
            <Route path='/resetPassword' component={resetPassword} />
            <Route path='/nav' component={nav}/>
        </Switch>
    </main>
)

export default main