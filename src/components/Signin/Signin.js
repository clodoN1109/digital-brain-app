import React from 'react';
// import './Signin.css';

class Signin extends React.Component {

    constructor(props) {
        super();
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = () => {
        this.setState({signInEmail : event.target.value})
    }

    onPasswordChange = () => {
        this.setState({signInPassword : event.target.value})
    }

    onSubmitSignIn = () => {

        fetch('http://localhost:3000/signin', {
            'method': 'post',
            'headers': {'Content-Type': 'application/json'},
            'body' : JSON.stringify({

                email: this.state.signInEmail,
                password: this.state.signInPassword

            })
        }).then(response => response.json())
          .then(user => {
            if (user){
                this.props.loadUser(user);
                this.props.onRouteChange('loggedin');}
        })
        
    }

    render(){

    const {onRouteChange} = this.props;
    return(

        <div>
        <main className="pa4">
            <div className="measure center">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-white w-100" 
                               type="email" 
                               name="email-address"  
                               id="email-address"
                               onChange={this.onEmailChange}
                               ></input>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-white w-100"
                         type="password" 
                         name="password"  
                         id="password"
                         onChange={this.onPasswordChange}
                         ></input>
                    </div>
                    
                </fieldset>
                <div className="">
                    <input 
                        onClick={this.onSubmitSignIn} 
                        className="b ph3 pv2 input-reset ba bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Sign in"
                        ></input>
                </div>
                <div className="lh-copy mt3">
                    <a onClick={() => onRouteChange('signup')} href="#0" className="f6 link dim db">Sign up</a>
                </div>
            </div>
        </main>
        </div>

    )

    }

};

export default Signin;