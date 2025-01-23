import { Router } from 'express';
const router = Router();
import {  getSingleUser, getUsers,  createUser, updateUser, deleteUser } from '../../controllers/userController.js';

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

export default router;
