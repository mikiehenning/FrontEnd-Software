import React from 'react';
import { Link } from 'react-router-dom';

// The Header creates links that can be used to navigate
// between routes.
const header = () => (
    <header>
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/testPage'>TestPage</Link></li>
                <li><Link to='/searchPatient'>Search Patient</Link></li>
                <li><Link to='/resetPassword'>reset Password</Link></li>
                <li><Link to='/searchAdmin'>Search Admin</Link></li>
                <li><Link to='/bates'>bates</Link></li>
            </ul>
        </nav>
    </header>
);

export default header;