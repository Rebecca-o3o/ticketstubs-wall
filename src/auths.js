import React from 'react';
import {Link} from 'react-router';

import axios from './axios';


export class Registration extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }
    submit(){
        axios.post('/register',{
            first: this.state.first,
            last: this.state.last,
            email: this.state.email,
            password: this.state.password
        }).then((res)=>{
            console.log(res);
            location.replace('/');
        }).catch((err)=>{
            console.log(err);
            //TODO: message to user
        });
    }
    handleClick(e){
        //class methods are not bound by default - bind this.handleClick before!
        //setting state
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render(){
        return (

            <div >
                <div>
                    <input type="text" name="first" placeholder="Vorname" onChange={this.handleClick} />
                    <input type="text" name="last" placeholder="Nachname" onChange={this.handleClick} />
                    <input type="email" name="email" placeholder="Email" onChange={this.handleClick} />
                    <input type="password" name="password" placeholder="Passwort" onChange={this.handleClick} />
                    <div>
                        <button type="submit" name="submit" onClick={e => this.submit()}>Register</button>
                    </div>
                </div>
                <div>
                    Or login <Link to="/login">here</Link>.
                </div>
            </div>

        );
    }
}

export class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }
    submit(){
        axios.post('/login',{
            email: this.state.email,
            password: this.state.password
        }).then((res)=>{
            console.log(res);
            location.replace('/');
        }).catch((err)=>{
            console.log(err);
            location.replace('/');
            //TODO: message to user
        });
    }
    handleClick(e){
        //class methods are not bound by default - bind this.handleClick before!
        //setting state
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render(){
        return (
            <div>
                <div>
                    <input type="email" name="email" placeholder="Email" onChange={this.handleClick} />
                    <input type="password" name="password" placeholder="Passwort" onChange={this.handleClick} />
                    <div>
                        <button type="submit" name="submit" onClick={e => this.submit()}>Log in</button>
                    </div>
                </div>
                <div>
                    No account? Register <Link to="/">here</Link>.
                </div>
            </div>
        );
    }
}
