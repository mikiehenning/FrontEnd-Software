import React from 'react';
import '../styling/searchAdmin.css';

const searchAdmin = () => (
    
    <div className="container">


        <div className="logo">LOGO</div>
        <div className="b">
            <label className="lab">Welcome,</label>
            <button type="button" className="b">Change Password</button>
            <button type="button" className="b">Logout</button>
        </div>

        <div className="buttonclass">
            <button type="button" className="button-admin">Create Nurse/Clinician</button>
            <button type="button" className="button-patient">Patient search</button>

        </div>
    </div>
    )
export default searchAdmin