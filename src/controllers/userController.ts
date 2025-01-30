import { User } from '../models/index.js';
import { Request, Response } from 'express';

  export const getUsers = async (_req: Request, res: Response) => {
    try {
      const users = await User.find()
        /* .populate({ path: 'tags', select: '-__v' }) */;

      res.json(users);
    } catch (err) {
      console.error({ message: err });
      res.status(500).json(err);
    }
  }

  export const getSingleUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        /* .populate({ path: 'tags', select: '-__v' }) */;

      if (!user) {
         res.status(404).json({ message: 'No user with that ID' });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // create a new user
  export const createUser = async (req: Request, res: Response) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  // update a user document
  export const updateUser = async (req: Request, res: Response) => {
    try {
      const result = await User.findOneAndUpdate(
        { _id: req.params.userId },
      { username: req.body.username });
      res.status(200).json(result);
      console.log(`Updated: ${result}`);
      
    } catch (err) {
      console.log('findOneAndUpdate(), something went wrong');
      res.status(500).json({ message: 'findOneAndUpdate(): something went wrong' });
      
    }
  }
  // delete a user document
  export const deleteUser = async (req: Request, res: Response) => {
    try {
      const result = await User.findOneAndDelete({ _id: req.params.userId });
      res.status(200).json(result);
      console.log(`Deleted: ${result}`);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  };

// Function to add a friend
export const addFriend = async (req: Request, res: Response): Promise<Response> => {
  const { userId, friendId } = req.params; // Extract userId and friendId from request parameters
  
  try {
    // Update the user document to add the friendId to the friends array
    if (userId === friendId) {//Trying to add yourself as a friend
      console.error('userID: '+ userId + "friendId: " + friendId);
      return res.status(500).json({ message: 'Unable to add self as a friend'});

    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } }, // Use $addToSet to avoid duplicates
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Updated User:', updatedUser);
    return res.status(200).json(updatedUser); // Send the updated user back in the response
  } catch (error) {
    console.error('Error adding friend:', error);
    return res.status(500).json({ message: 'Error adding friend' }); // Ensure to return a response in case of error
  }
};
// Function to delete a friend
export const deleteFriend = async (req: Request, res: Response): Promise<Response> => {
  const { userId, friendId } = req.params; // Extract userId and friendId from request parameters
  
  try {
    // Update the user document to delete the friendId in the friends array
      const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } }, 
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Updated User:', updatedUser);
    return res.status(200).json(updatedUser); // Send the updated user back in the response
  } catch (error) {
    console.error('Error adding friend:', error);
    return res.status(500).json({ message: 'Error adding friend' }); // Ensure to return a response in case of error
  }
};

