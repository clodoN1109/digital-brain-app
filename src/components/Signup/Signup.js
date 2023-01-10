import React from 'react';
// import './Signup.css';

const Signup = ({onRouteChange}) => {

    return(

        <div>
            <article class="pa4">
            <form action="sign-up_submit" method="get" accept-charset="utf-8">
                <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                <legend class="ph0 mh0 fw6 clip">Sign Up</legend>
                <div class="mt3">
                    <label class="db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
                    <input class="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email-address"  id="email-address"></input>
                </div>
                <div class="mt3">
                    <label class="db fw4 lh-copy f6" htmlFor="favorite-color">Favorite Color</label>
                    <input style={{width:"70px", height:"70px"}} class=" input-reset ba bg-transparent w-100" type="color" name="favorite-color"  id="favorite-color"></input>
                </div>
                <div class="mt3">
                    <label class="db fw4 lh-copy f6" htmlFor="password">Password</label>
                    <input class="b pa2 input-reset ba bg-transparent" type="password" name="password"  id="password"></input>
                </div>
                </fieldset>
                <div onClick={() => onRouteChange('signin')} class="mt3"><input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Sign Up"></input></div>
            </form>
            </article>
        </div>

    )

};

export default Signup;