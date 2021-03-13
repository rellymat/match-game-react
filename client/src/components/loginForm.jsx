import "../styles/loginForm.css";
import React from "react";
import { NavLink } from 'react-router-dom'
import Joi from "joi-browser";
import Form from "./common/form";
import auth from '../services/auth'


class LoginForm extends Form {
    state = {
        data: { username: "", password: "" },
        errors: {}
    };

    schema = {
        username: Joi.string()
            .required()
            .label("Username"),
        password: Joi.string()
            .required()
            .label("Password")
    };

    doSubmit = async (e) => {
            const {password, username} = this.state.data
            const user = {
                username,
                password
            }
            try {
                await auth.login(user)
                window.location = '/profile'
            } catch (error) {
                if(error.response && error.response.status === 400){
                    const message = error.response.data
                    const errors = { ...this.state.errors }
                    errors.username = message
                    this.setState({errors})
                }
            }
        };
    


    render() {
        const link = <NavLink to="/board" >Sign up</NavLink>
        return (
            <div className="form-div">
                <form onSubmit={this.handleSubmit}>
                    <h1>Login</h1>
                    {this.renderInput("username", "Username or Email")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderButton("Sign in")}
                    <p className="center">Don't have account? {link}</p>
                    <NavLink className="center" to="/guest" >Play as a guest</NavLink>
                </form>

            </div>
        );
    }
}

export default LoginForm;
