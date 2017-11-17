import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './home'
import loginPage from './loginPage'
import searchPatient from './searchPatient'
import searchAdmin from './searchAdmin'
import resetPassword from './resetPassword'
import MNAtest from './MNAtest'
import wagnerScaleTest from './wagnerScaleTest'
import testSelectionPage from './testSelectionPage'
import createAccount from './createAccount'

// The Main component renders one of the many provided
// Routes (provided that one matches).
const main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/loginPage' component={loginPage} />
            <Route path='/searchPatient' component={searchPatient} />
            <Route path='/searchAdmin' component={searchAdmin} />
            <Route path='/resetPassword' component={resetPassword} />
            <Route path='/MNAtest' component={MNAtest} />
            <Route path='/wagnerScaleTest' component={wagnerScaleTest} />
            <Route path='/testSelectionPage' component={testSelectionPage} />
            <Route path='/createAccount' component={createAccount} />
        </Switch>
    </main>
)

export default main