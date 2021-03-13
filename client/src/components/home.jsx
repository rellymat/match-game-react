import React, { Component } from 'react';
import Button from './common/button';
import Header from './common/header';
import '../styles/home.css'


class Home extends Component {
    signin = () => {
        this.props.history.push("/login")
    }

    signup = () => {
        this.props.history.push("/signup")
    }

    play = () => {
        this.props.history.push("/guest")
    }

    render() { 
        return (
        <React.Fragment >
            <Header title="Welcome to MatchGame!"/> 
            <div className="container pos">
                <div>
                <Button style="buttonsize  btn btn-danger" handleButton={this.signin} text="Login" />
                </div>
                <div >
                <Button style="buttonsize  btn btn-primary" handleButton={this.signup} text="Sign-up" />
                </div>
                <div >
                <Button style="buttonsize  btn btn-secondary" handleButton={this.play} text="Play as a guest" />
                </div>
            </div>
        </React.Fragment>
        );
    }
}
 
export default Home;