import React from 'react';
// import './Signin.css';
import Tilt from 'react-parallax-tilt';

class Signin extends React.Component {

    constructor(props) {
        super();
        this.state = {
            signInEmail: '',
            signInPassword: '',
            route: ''
        }
    }

    onEmailChange = () => {
        this.setState({signInEmail : event.target.value});
        this.setState({route:''});
    }

    onPasswordChange = () => {
        this.setState({signInPassword : event.target.value});
        this.setState({route:''});
    }

    onSubmitSignIn = () => {

        fetch('https://digitalbrainapp.onrender.com/signin', {
            'method': 'post',
            'headers': {'Content-Type': 'application/json'},
            'body' : JSON.stringify({

                email: this.state.signInEmail,
                password: this.state.signInPassword

            })
        }).then(response => response.json())
          .then(user => {
            if (user === 'Wrong credentials.'){
                this.setState({route:'failedToSignin'});
            }
            else{

                this.props.loadUser(user);
                this.props.onRouteChange('loggedin');

            }
        })
        
    }

    render(){

    const {onRouteChange} = this.props;
    return(

        <div>
        
        <main className="pa4" >
            <div className="measure center" >
            <Tilt className='Tilt br2 shadow-2' style={{padding:'50px', height:'400px', opacity:'1'}}>
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-blue w-100" 
                               type="email" 
                               name="email-address"  
                               id="email-address"
                               onChange={this.onEmailChange}
                               style={{color:'rgb(24,140,180)'}}
                               ></input>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-blue w-100"
                         type="password" 
                         name="password"  
                         id="password"
                         onChange={this.onPasswordChange}
                         style={{color:'rgb(24,140,180)'}}
                         ></input>
                    </div>
                    
                </fieldset>
                <div className="">
                {(this.state.route === 'failedToSignin') ? <div style={{margin: '5px', color:'red', fontFamily:'courier'}}>WRONG CREDENTIALS!</div> : <div style={{margin: '5px', color:'transparent'}}>R</div>}
                    <input 
                        onClick={this.onSubmitSignIn} 
                        className="b ph3 pv2 input-reset ba bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Sign in"
                    ></input>
                </div>
                <div onClick={() => onRouteChange('signup')}  className="b ph3 pv2 input-reset bg-transparent grow pointer f6 dib black" style={{marginTop:'5px'}}>
                    <a  style={{color: 'rgb(24,140,180)'}} href="#0" className="f6 link dim db">Sign up</a>
                </div>
            </Tilt>
            </div>
        </main>
        
        </div>

    )

    }

};

export default Signin;