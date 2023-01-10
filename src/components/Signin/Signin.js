import React from 'react';
// import './Signin.css';

const Signin = ({onRouteChange}) => {

    return(

        <div>
        <main className="pa4">
            <form className="measure center">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"></input>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"></input>
                    </div>
                    
                </fieldset>
                <div className="">
                    <input onClick={() => onRouteChange('loggedin')} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"></input>
                </div>
                <div className="lh-copy mt3">
                    <a onClick={() => onRouteChange('signup')} href="#0" className="f6 link dim black db">Sign up</a>
                </div>
            </form>
        </main>
        </div>

    )

};

export default Signin;