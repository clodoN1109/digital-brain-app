import React from 'react';
// import './Signup.css';

class Signup extends React.Component {

    constructor(props) {
        super();
        this.state = {
            name: '',
            email: '',
            favoriteColor:'#000000',
            password: ''
        }
    }

    onNameChange = () => {
        this.setState({name : event.target.value})
    }

    onEmailChange = () => {
        this.setState({email : event.target.value})
    }

    onColorChange = () => {
        this.setState({favoriteColor : event.target.value})
    }

    onPasswordChange = () => {
        this.setState({password : event.target.value})
    }

    onSubmitSignUp = () => {

        fetch('http://localhost:3000/register', {
            'method': 'post',
            'headers': {'Content-Type': 'application/json'},
            'body' : JSON.stringify({

                name: this.state.name,
                email: this.state.email,
                favoriteColor: this.state.favoriteColor,
                password: this.state.password

            })
        }).then(response => response.json())
          .then(data => {
            console.log(data);
            this.props.onRouteChange('signin');
           });
            
    }

    render(){

        

        return(

            <div>
                <article className="pa4">
                <form action="sign-up_submit" method="get" acceptCharset="utf-8">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="name">Name</label>
                        <input className="pa2 input-reset ba bg-transparent w-30 measure" 
                               type="text" 
                               name="name"  
                               id="name"
                               onChange={this.onNameChange}
                            ></input>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
                        <input className="pa2 input-reset ba bg-transparent w-30 measure" 
                               type="email" 
                               name="email-address"  
                               id="email-address"
                               onChange={this.onEmailChange}
                               ></input>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent w-30" 
                               type="password" 
                               name="password"  
                               id="password"
                               onChange={this.onPasswordChange}
                               ></input>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="favorite-color">Favorite Color</label>
                        <input style={{width:"70px", height:"70px"}} 
                               className=" input-reset ba bg-transparent w-100" 
                               type="color" 
                               name="favorite-color"  
                               id="favorite-color"
                               onChange={this.onColorChange}
                               ></input>
                    </div>
                   
                    </fieldset>
                    <div onClick={this.onSubmitSignUp} className="mt3"><input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Sign Up"></input></div>
                </form>
                </article>
            </div>
    
        )

    };
    

};

export default Signup;