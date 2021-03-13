import React from 'react';
import { deleteUser } from '../services/auth';
import Form from './common/form';
import  Joi  from 'joi-browser';
import { toast } from 'react-toastify';
import { deleteUserCategory } from '../services/gameService';

class Delete extends Form {
    state = {
        data: {
            user: ""
        },
        errors: {}
    };

    schema = {
        user: Joi.string()
            .required()
            .label("User")
    };
 
    doSubmit = async (e) => {
        try {
            const { user } = this.state.data
            await deleteUser(user)
            await deleteUserCategory()
            window.location = '/logout'
        } catch (error) {
            
            if(error.response && error.response.status === 404){
                const message = error.response.data
                const errors = { ...this.state.errors }
                errors['user'] = message
                this.setState({errors})
            }
        }
    };


    render() { 
        return ( 
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="center">
                        <br />
                        {this.renderInput("user", "User")}
                    </div>
                    {this.renderButton("Delete")}
                </form>
            </div>
         );
    }
}
 
export default Delete