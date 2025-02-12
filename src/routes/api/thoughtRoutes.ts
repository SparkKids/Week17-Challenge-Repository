import { Router } from 'express';
const router = Router();
import {   getSingleThought,  getThoughts,  addThought , updateThought, deleteThoughtAndUpdateUser, addReaction, deleteReaction  } from '../../controllers/thoughtController.js';

router.route('/').get(getThoughts).post(addThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought);

router.route('/:thoughtId/:userId').delete(deleteThoughtAndUpdateUser);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

export default router;
