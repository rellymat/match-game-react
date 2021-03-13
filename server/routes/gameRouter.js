import express from 'express';
import { getGames , getGame , postGame, updateGame, getCategories, deleteGame, deleteCategory
        , getCategoriesGuest, deleteUser } from '../controllers/gameController.js';
import {auth} from './../middleware/auth.js';

const router = express.Router();

router.get('/categories/guest', getCategoriesGuest)
router.get('/categories',auth, getCategories)
router.get('/:gameID',auth, getGame)
router.get('/:user/:category',  getGames)
router.delete('/user', auth, deleteUser)
router.delete('/:id', auth, deleteGame)
router.delete('/category/:name', auth, deleteCategory)
router.post('/add', auth, postGame)
router.put('/:id',auth, updateGame )

export default router;