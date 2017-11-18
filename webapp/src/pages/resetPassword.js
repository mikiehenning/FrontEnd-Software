import React from 'react';
import '../styling/resetPassword.css';

const resetPassword = () => (
    <div className="container">
        <div class="leftside">
            <div className="logo">LOGO</div>
            </div>
        <div className="b">
            <label className="lab">Welcome,</label>
            <button type="button" className="b">Logout</button>
        </div>

        <form class="inputform">
            <div className="oldpassword">
                <label className="label">Old Password: </label>
                <input className="inputboxpassword" type="text" />
            </div>

            <div class="newpassword">
                <label className="label">New Password: </label>
                <input className="inputboxpassword" type="text" /><br />
                <label className="label" >Confirm New Password: </label>
                <input className="inputboxpassword" type="text" />
             </div>
  
            <input className="changeButton" type="submit" value="Confirm Password" />
         </form>
    </div >
)
export default resetPassword