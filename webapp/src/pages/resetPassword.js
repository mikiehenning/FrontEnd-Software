import React from 'react';
import '../styling/resetPassword.css';
//import Logo from './Logo.jpg';



const resetPassword = () => (
    <body>
    <div class="container">
    
        <div class="leftside">
        <div class="logo">LOGO
        
        </div>
        <div class="b">
            <label class="lab">Welcome,</label>
            <button type="button" class="b">LOGOUT</button>
        </div>
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
            
             <button type="button" class="bChange">CHANGE PASSWORD</button>
             </form>
        
     
    </div >
    </body>
)
export default resetPassword