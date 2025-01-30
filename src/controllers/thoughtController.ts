import { Thought } from '../models/index.js';
import { User } from '../models/index.js';
import { Request, Response } from 'express';
import mongoose from 'mongoose'; // Ensure mongoose is imported

  export const getThoughts = async (_req: Request, res: Response) => {
    try {
      const thoughts = await Thought.find()
        /* .populate({ path: 'tags', select: '-__v' }) */;

      res.json(thoughts);
    } catch (err) {
      console.error({ message: err });
      res.status(500).json(err);
    }
  }

  export const getSingleThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        /* .populate({ path: 'tags', select: '-__v' }) */;

      if (!thought) {
         res.status(404).json({ message: 'No thought with that ID' });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // create a new thought
  export const createThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.create(req.body);
      // Update the user's thoughts array
      await User.findByIdAndUpdate(
      req.body.userId, // Assuming you are passing the userId in the request body
      { $push: { thoughts: thought._id } }, // Push the new thought's ID into the user's thoughts array
      { new: true } // Return the updated user document
    );
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  }
   // update a thought document
  export const updateThought = async (req: Request, res: Response) => {
    try {
      const result = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
      { thoughtText: req.body.thoughtText });
      res.status(200).json(result);
      console.log(`Updated: ${result}`);
      
    } catch (err) {
      console.log('findOneAndUpdate(), something went wrong');
      res.status(500).json({ message: 'findOneAndUpdate(): something went wrong' });
      
    }
  }
//   // delete a user document
  export const deleteThought = async (req: Request, res: Response) => {
    try {
      const result = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      res.status(200).json(result);
      console.log(`Deleted: ${result}`);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  };
    // create a new reaction
    export const addReaction = async (req: Request, res: Response): Promise<Response> => {
      const { thoughtId } = req.params; // Extract thoughtId from request parameters
      const { reactionBody, username } = req.body; // Extract reaction details from the request body
    
      try {
        // Create the reaction object with necessary fields
        const newReaction = {
          reactionId: new mongoose.Types.ObjectId(), // Generate a new ObjectId for reactionId
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
    
        console.log('Updated Thought:', updatedThought);
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
    const objectIdReactionId = new mongoose.Types.ObjectId(reactionId);

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