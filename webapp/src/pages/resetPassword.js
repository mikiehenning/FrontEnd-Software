import React from 'react';
import '../styling/resetPassword.css';
//import Logo from './Logo.jpg';

const resetPassword = () => (

    <body>
    <div class="container">
    
        <div class="leftside">
                <div class="logo">LOGO </div>

        <div class="b">
            <label class="lab">Welcome,</label>
            <button type="button" class="b">LOGOUT</button>
        </div>

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
  
             <button type="button" class="bChange">CHANGE PASSWORD</button>
     

    </div >
 </body>
)
export default resetPassword