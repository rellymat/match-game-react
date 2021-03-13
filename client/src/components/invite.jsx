import React from 'react';
import Joi from "joi-browser";
import Form from './common/form';
import { putNotifications } from '../services/userService';
import { toast } from 'react-toastify';


class Invite extends Form {
    state = {
        data: {
            user: ""
        },
        errors: {}
    };

    schema = {
        user: Joi.string()
            .required()
    };
 
    doSubmit = async (e) => {
        try {
            const { user } = this.state.data
            await putNotifications(user, this.props.match.params.category)
            toast("Success")
        } catch (error) {
            toast.error("Failed.. try again")
        }
    };

    render() {
        return (
            <div>
                <h1>{this.props.match.params.category}</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="center">
                        <br />
                        {this.renderInput("user", "User")}
                    </div>
                    {this.renderButton("Send")}
                </form>
            </div>
        );
    }
}

export default Invite;