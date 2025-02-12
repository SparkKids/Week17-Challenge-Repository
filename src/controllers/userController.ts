import User from '../models/User.js';
import Thought from '../models/Thought.js';
import { Request, Response } from 'express';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    //Return all users with their thoughts array populated
    const users = await User.find().populate('thoughts');
    return res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);

    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return res.status(500).json({ message: "Internal Server Error", error: errorMessage });
  }
};


export const getSingleUser = async (req: Request, res: Response) => {
  //req.params.userId = userId to retrieve
  try {
    const user = await User.findById(req.params.userId).populate('thoughts');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    //Convert the User object to a JSON object and return it.
    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// create a new user
export const createUser = async (req: Request, res: Response) => {
  //  req.body.username - The new user's username,
  //  req.body.email - The new user's email address

  try {
    // Create the user with a new userId
    const user = await User.create({
      ...req.body, // Spread the existing request body
    });
    //Convert the new User to a JSON object and return it
    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
}
// update a user document
export const updateUser = async (req: Request, res: Response) => {
  //req.params.userId - the User's userid to find
  //req.body.username - the User's updated userid
  try {
    const result = await User.findByIdAndUpdate(
      req.params.userId,
      { username: req.body.username },
      {new: true});// new: true = Return the updated user object
    return res.status(200).json(result);
    console.log(`Updated: ${result}`);

  } catch (err) {
    console.log('findOneAndUpdate(), something went wrong');
    return res.status(500).json({ message: 'findOneAndUpdate(): something went wrong' });

  }
}
// delete a user document
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    // First, find the user by _Id
    const userId = req.params.userId
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get the username
    const username = user.username;

    //Before deleting the user, Iterate through each thoughtId in the 
    // user's thoughts array and delete the thought document
    for (const thoughtId of user.thoughts) {
      await Thought.findByIdAndDelete(thoughtId); // Delete each thought document
    }

    // Now delete the user document
    const result = await User.findByIdAndDelete(userId );
    // Send response with the deleted user's username
    return res.status(200).json({ message: `Deleted user: ${username}`, result });
  } catch (err) {
    console.log('Uh Oh, something went wrong');
    return res.status(500).json({ message: 'something went wrong' });
  }
};

// Function to add a friend
export const addFriend = async (req: Request, res: Response): Promise<Response> => {
  const { userId, friendId } = req.params; // Extract userId and friendId from request parameters

  try {
    // Update the user document to add the friendId to the friends array
    if (userId === friendId) {//Trying to add yourself as a friend
      console.error('userID: ' + userId + "friendId: " + friendId);
      return res.status(500).json({ message: 'Unable to add self as a friend' });

    }
    // adds the friend's userId to the friends array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } }, // Use $addToSet to avoid duplicates
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

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

