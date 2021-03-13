import express from 'express';
import { login , signup, getInvitations , getNotifications, putNotifications, deleteNotifications,
    putInvitations, deleteInvitations, deleteUser } from '../controllers/userController.js';
import {auth} from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login)
router.post('/signup', signup)
router.put('/invitations/:user/:category', auth, putInvitations)
router.put('/notifications/:user/:category', auth, putNotifications)
router.delete('/invitations/:user/:category', auth, deleteInvitations)
router.delete('/notifications/:user/:category', auth, deleteNotifications) 
router.delete('/delete', auth, deleteUser) 
router.get('/invitations', auth, getInvitations)
router.get('/notifications', auth, getNotifications)

export default router;