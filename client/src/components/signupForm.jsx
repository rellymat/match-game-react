import React from "react";
import { NavLink } from 'react-router-dom'
import Joi from "joi-browser";
import Form from "./common/form";
import "../styles/signupForm.css";
import { signup } from './../services/auth';

class SignupForm extends Form {
    state = {
        data: { email: "", username: "", password: "", pswconfirm: "" },
        errors: {}
    };

    schema = {
        email: Joi.string()
            .required()
            .email()
            .label("Email"),
        username: Joi.string()
            .required()
            .label("Username")
            .min(5),
        password: Joi.string()
            .required()
            .label("Password")
            .min(5),
        pswconfirm: Joi.string()
            .required()
            .label("Confirm password")
            .min(5)
    };

    isConfirm = () => {
        const { password, pswconfirm } = this.state.data
        if (password !== pswconfirm) {
            return false
        }
        return true
    }


    handleSubmit = e => {
        e.preventDefault();

        let errors = {}
        errors = this.validate();
        if (!this.isConfirm()) {
            if (!errors) {
                errors = {}
            }
            errors['pswconfirm'] = "Not equale"
        }
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit();
    }

    doSubmit = async (e) => {
        const {password, email, username} = this.state.data
        const user = {
            email,
            username,
            password
        }

        try {
            
            const response = await signup(user)
            localStorage.setItem("token", response.headers['auth-token'])
            window.location = '/'
            
        } catch (error) {

            if(error.response && error.response.status === 400){
                const message = error.response.data
                const errors = { ...this.state.errors }
                if(message.includes('Email')) 
                    errors.email = message
                if(message.includes('User'))
                    errors.username = message
                this.setState({errors})
            }
        }
    };


    render() {
        const link = <NavLink to="/login" >login</NavLink>
        return (
            <div className="form-div location">
                <form onSubmit={this.handleSubmit}>
                    <h1>sign up</h1>
                    {this.renderInput("email", "Email")}
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderInput("pswconfirm", "Confirm password", "password")}
                    {this.renderButton("Sign up")}
                    <p className="center">Already have account? {link}</p>
                    <NavLink className="center" to="/guest" >Play as a guest</NavLink>
                </form>
            </div>
        );
    }
}

export default SignupForm;
