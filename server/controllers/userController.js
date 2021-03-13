import bcrypt from 'bcryptjs'
import jws from 'jsonwebtoken'
import Users from '../models/userSchema.js';

export const login = async (req, res) => {
    const user = req.body;
    const emailDB = await Users.findOne({ email: user.username })
    let userDB = await Users.findOne({ username: user.username })
    if (!userDB && !emailDB) return res.status(400).send('Email or username or pasword is wrong')

    userDB = userDB !== null ? userDB : emailDB
    let validPass = await bcrypt.compare(user.password, userDB.password)
    if (!validPass) return res.status(400).send('Email or username or pasword is wrong')

    const token = jws.sign({ user: userDB.username }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)
}

export const deleteUser = async (req, res) => {
    const userSend = req.body.user;
    const user = req.user.user
    if (user !== userSend)
        return res.status(404).send("The user was not found.");

    const remove = await Users.findOneAndRemove({ username: user })

    res.send(remove);

}

export const signup = async (req, res) => {
    const user = req.body;
    

    const emailExist = await Users.findOne({ email: user.email })
    if (emailExist) return res.status(400).send('Email already exist')

    const userExist = await Users.findOne({ username: user.username })
    if (userExist) return res.status(400).send('User already exist')

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(user.password, salt)

    const newUser = new Users({
        email: user.email,
        username: user.username,
        password: hashPassword,
        invitation: [],
        notification: []
    })

    try {
        await newUser.save()
        const token = jws.sign({ user: user.username }, process.env.TOKEN_SECRET)
        res.status(201)
            .header('auth-token', token)
            .header("access-control-expose-headers", "auth-token")
            .send(token)
    } catch (error) {
        res.status(409).send({ message: error.message })
    }
}

export const getInvitations = async (req, res) => {
    const user = req.user.user
    try {
        const invitations = await Users.findOne({ username: user }).select('invitation -_id')
        if (!invitations) return res.status(400).send('User not found')
        res.status(200).json(invitations)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getNotifications = async (req, res) => {
    const user = req.user.user
    try {
        const notifications = await Users.findOne({ username: user }).select('notification -_id')
        if (!notifications) return res.status(400).send('User not found')
        res.status(200).json(notifications)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const putNotifications = async (req, res) => {
    const { user, category } = req.params
    const userOwner = req.user.user
    try {
        await Users.findOneAndUpdate({ username: user }, {
            $pull: {
                notification: { user: userOwner, category }
            }
        })
        const notifications = await Users.findOneAndUpdate({ username: user }, {
            $push: {
                notification: { user: userOwner, category }
            }
        })
        if (!notifications) return res.status(400).send('User not found')
        res.status(200).json(notifications)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const putInvitations = async (req, res) => {
    const { user, category } = req.params
    const userOwner = req.user.user
    try {
        await Users.findOneAndUpdate({ username: userOwner }, {
            $pull: {
                invitation: { user: user, category }
            }
        })
        const invitations = await Users.findOneAndUpdate({ username: userOwner }, {
            $push: {
                invitation: { user: user, category }
            }
        })
        if (!invitations) return res.status(400).send('User not found')
        res.status(200).json(invitations)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const deleteNotifications = async (req, res) => {
    const { user, category } = req.params
    const userOwner = req.user.user
    try {
        const notifications = await Users.findOneAndUpdate({ username: userOwner }, {
            $pull: {
                notification: { user: user, category }
            }
        })
        if (!notifications) return res.status(400).send('User not found')
        res.status(200).json(notifications)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


export const deleteInvitations = async (req, res) => {
    const { user, category } = req.params
    const userOwner = req.user.user
    try {
        const invitations = await Users.findOneAndUpdate({ username: userOwner }, {
            $pull: {
                invitation: { user: user, category }
            }
        })
        if (!invitations) return res.status(400).send('User not found')
        res.status(200).json(invitations)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}