import React from 'react';
import '../styling/resetPassword.css';

const resetPassword = () => (
    <div class="container">
        <div class="logo">LOGO</div>
        <div class="b">
            <label class="lab">Welcome,</label>
            <button type="button" class="b">Change Password</button>
            <button type="button" class="b">Logout</button>
        </div>

        <form class="inputform">
            <div class="oldpassword">
                <label class="label">Old Password: </label>
                <input class="inputboxpassword" type="text" />
            </div>

            <div class="newpassword">
                 <label class="label">New Password: </label>
                 <input class="inputboxpassword" type="text" />
             </div>
  
                 <input class="changeButton" type="submit" value="Confirm Password" />
         </form>
    </div >
)
export default resetPassword