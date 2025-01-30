import { Router } from 'express';
const router = Router();
import {  getSingleUser, getUsers,  createUser, updateUser, deleteUser, addFriend, deleteFriend } from '../../controllers/userController.js';

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

export default router;
