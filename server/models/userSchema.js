import mongoose from 'mongoose';

const createSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    notification: [{
        user: String, 
        category: String
    }],
    invitation: [{
        user: String, 
        category: String
    }]
})

const Users = mongoose.model('users', createSchema)

export default Users;