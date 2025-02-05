import { Thought } from '../models/index.js';
import { User } from '../models/index.js';
import { Request, Response } from 'express';
import { Types } from 'mongoose'; // Import Types from mongoose
export const getThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find()

    res.json(thoughts);
  } catch (err) {
    console.error({ message: err });
    res.status(500).json(err);
  }
}

export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId)

    if (!thought) {
      res.status(404).json({ message: 'No thought with that ID' });
    } else {
      res.json(thought);
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
export const addThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.create(req.body);

    // Add thought ID to user's thoughts array
    await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: thought._id } },
      { new: true }
    );

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// create a new thought
export const createThought = async (req: Request, res: Response) => {
  try {
    // Create the thought with a new thoughtId
    const thought = await Thought.create({
      ...req.body, // Spread the existing request body
      userId: req.body.userId
    });

    // Update the user's thoughts array with the new thought's thoughtId
    const updatedUser = await User.findByIdAndUpdate(
      req.body.userId, // Correctly searching by userId
      { $push: { thoughts: thought._id } }, // Update the thoughts array
      { new: true } // Return the updated document
    );

    // Log the updated user
    console.log("Updated User:", updatedUser);
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
// update a thought document
export const updateThought = async (req: Request, res: Response) => {
  try {
    const result = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { thoughtText: req.body.thoughtText });
    res.status(200).json(result);
    console.log(`Updated: ${result}`);

  } catch (err) {
   res.status(500).json({ message: 'findOneAndUpdate(): something went wrong' });

  }
}
// delete a thought document and remove it from the user's thoughts array
export const deleteThoughtAndUpdateUser = async (req: Request, res: Response): Promise<Response> => {
  const { thoughtId, userId } = req.params; // Extract thoughtId and userId from request parameters
  try {
    // Step 1: Find the thought
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).send('Thought not found');
    }

    // Step 2: Delete the thought
    await Thought.findByIdAndDelete(thoughtId);

    // Step 3: Remove the thoughtId from the User's thoughts array
    await User.findByIdAndUpdate(
      userId,
      { $pull: { thoughts: thoughtId } }
    );

    return res.status(200).send('Thought deleted and user updated successfully.'); // Return the response
  } catch (error) {
    console.error('Error deleting thought or updating user:', error);
    return res.status(500).send('Error deleting thought or updating user.'); // Return the response
  }
};//export const deleteThoughtAndUpdateUser = async (req: Request, res: Response): Promise<Response> => {

// create a new reaction
export const addReaction = async (req: Request, res: Response): Promise<Response> => {
  const { thoughtId } = req.params; // Extract thoughtId from request parameters
  const { reactionBody, username } = req.body; // Extract reaction details from the request body

  try {
    // Create the reaction object with necessary fields
    const newReaction = {
      reactionId: new Types.ObjectId(), // Generate a new ObjectId for reactionId
      reactionBody,
      username,
      createdAt: new Date() // Set the current date as the createdAt timestamp
    };

    // Update the thought document to add the reaction to the reactions array
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId, // The thought ID
      { $push: { reactions: newReaction } }, // Push the full reaction object into the reactions array
      { new: true } // Return the updated thought document
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    console.log('Added Reaction:', updatedThought);
    return res.status(200).json(updatedThought); // Send the updated thought back in the response
  } catch (error) {
    console.error('Error adding reaction:', error);
    return res.status(500).json({ message: 'Error adding reaction' }); // Ensure to return a response in case of error
  }
};
// delete a reaction
export const deleteReaction = async (req: Request, res: Response): Promise<Response> => {
  const { thoughtId, reactionId } = req.params; // Extract thoughtId and reactionId from request parameters

  try {
    // Convert reactionId to ObjectId for proper matching
    const objectIdReactionId = new Types.ObjectId(reactionId);

    // Update the thought document to remove the reaction with the matching reactionId
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId, // The thought ID
      { $pull: { reactions: { reactionId: objectIdReactionId } } },
      { new: true } // Return the updated thought document
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    console.log('Updated Thought:', updatedThought);
    return res.status(200).json(updatedThought); // Send the updated thought back in the response
  } catch (error) {
    console.error('Error removing reaction:', error);
    return res.status(500).json({ message: 'Error removing reaction' }); // Ensure to return a response in case of error
  }
};