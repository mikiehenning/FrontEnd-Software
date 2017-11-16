import React from 'react';
import { Link } from 'react-router-dom';


const home = () => (
    <div>
        <h1>Welcome to the Corstrata Website!</h1>
        <button><Link to='/testPage'>TestPage</Link></button>
    </div>
)

export default home;