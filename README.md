# Week17-Challenge - NoSQL: Social Network API

![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)

## Description
This application provides an API for accessing a MongoDb for all CRUD operations in a social networking application.

The API connects to MongooseDb using the MongooseDb connect api to connect to the database and exports mongoose.connection for use by the rest of the application. The application runs using Express JS. After the backend is started, all functionality is invoked using http URLs

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [NoSQL-Backend](#nosql-backend)
- [Insomnia-Testing](#insomnia-testing)
- [API-Routes](#api-routes)
- [Video](#video)
- [Credits](#credits)
- [License](#license)
- [Badges](#badges)


## Installation
All code is located in the gitHub repository https://github.com/SparkKids/Week17-Challenge-Repository

To install the application download all the code into a root directory. For example: C:/Challenge-17/Main

in a git-bash command prompt cd into the root directory:
cd ~/Challenge-17/Main/
Then run the following npm commands:
npm install
npm run build

These npm commands install all dependencies for the program and build the package for execution

## Usage
This weeks challenge has a noSQL (MongoDB) based backend running Express JS. The backend is tested using Insomnia.

### NoSQL-Backend
The package is run from the git-bash command line prompt:
From  ~/Challenge-17/Main/
Enter:
npm run start
This starts the application. 

When the backend application has started the command line will display:
API server running on port nnnn! 
nnnn is the port # the application is running on. Write the port # down. This port# is used for testin in Insomnia

### Insomnia-Testing

You will need an Insomnia account to test the MongoDb backend. Refer to https://insomnia.rest/ for details.

### API-Routes
Note: In these examples, the API server is running on 3001 (localhost:3001) 

/api/users
Get All Users:
GET http://localhost:3001/api/users/
Parameters: None
Returns: res.json(users) - all User documents
Create User:
POST http://localhost:3001/api/users/
Parameters:
req.body.username - The new user's username,
req.body.email - The new user's email address
Returns: res.json(user) - the created User document

Get Single User
GET http://localhost:3001/api/users/userId
Parameters: 
req.params.userId = userId to retrieve
Returns: res.json(user) - the requested User document

Update User
PUT http://localhost:3001/api/users/userId
Parameters: 
req.params.userId = userId to update
Returns: res.json(user) - the updated User document

Delete User
DELETE http://localhost:3001/api/users/userId
Parameters: 
req.params.userId = userId to delete
Returns: res.status(200).json({ message: `Deleted user: ${username}`, result })

Add Friend
POST http://localhost:3001/api/users/userId/friends/friendId
Parameters: 
req.params.userId = userId to add friend to
req.params.friendId = userId of friend
Returns: res.status(200).json(updatedUser) the User updated document (showing friends array).

Delete Friend
DELETE http://localhost:3001/api/users/userId/friends/friendId
Parameters: 
req.params.userId = userId to delete friend from
req.params.friendId = userId of friend to delete
Returns: res.status(200).json(updatedUser) - User document of user having friend deleted

/api/thoughts

Get Thoughts
GET http://localhost:3001/api/thoughts
Parameters: 
None
Returns: return res.json(thoughts) - all Thought Documents

Add Thought
POST http://localhost:3001/api/thoughts/
Parameters: 
req.body.username - Who is adding the thought (added to the thought)
req.body.userId - The userId of User having  the thought added to their thoughts array
req.body.thoughtText - Text of the though being added 

Get Single Thought
GET http://localhost:3001/api/thoughts/thoughtId
Parameters:
req.params.thoughtId = Id for the Thought document being retrieved
Returns: res.json(thought) The Thought document being retrieved.

Update Thought
PUT http://localhost:3001/api/thoughts/thoughtId
Parameters:
req.params.thoughtId = Id for the Thought document being updated
req.body.thoughtText = The new text to replace the existing Thought.thoughtText
Returns: res.status(200).json(result) - The updatted Thought document

Delete Thought
DELETE http://localhost:3001/api/thoughts/ThoughtId/userId
Parameters:
req.params.thoughtId = Id for the Thought document being deleted
req.params.userId = id for the User who needs to have the thought removed from their thoughts array.
Returns: Message conforming the thoughts deletion and user's thoughts array was updated

Add Reaction
POST  http://localhost:3001/api/thoughts/thoughtId/reactions
Parameters:
req.params.thoughtId = Id for the Thought having a reaction added to it
req.body.reactionBody = The text for the reaction.
req.body.username = The username of the person leaving a reaction
Returns: 
res.status(200).json(updatedThought) = The updated thought including the reactions array

Delete Reaction
DELETE http://localhost:3001/api/thoughts/thoughtId/reactions/reactionId
Parameters:
req.params.thoughtId = Id for the Thought having a reaction removed
req.params.ractionId - The reactionId for the reaction being removed
Returns: 
res.status(200).json(updatedThought) = The updated thought including the reactions array


 ## Video
  NoSQL: Social Network API Video: https://drive.google.com/file/d/13UMsUajuW-Ks9vLru6yhPmo8P4r8XNMI/view

  ## Credits

  Extensive use was made of the BootCamp Xpert Learning Assistant. This AI tool was a valuable learning tool. It helped with debugging and understanding how to write better Mongoose code. For example, I had some section headings in my README that were hyphenatedsuch as API-Routes. I incorrectly had these in Mixed Case in my TOC. I had to change (# API-Routes) to (# api-routes).  

  I found as I continued coding. I had to rely on the BootCamp Xpert Learning Assistant less often.

  Occasional use was also made of the bootcamp tutors, and the AskBCS Learning Assistant.

  ## License

  This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

  ## Badges
 ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

 ![MongoDb](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
 
 ![JSON](https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white)

 ![Insomnia](https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white)

 ![Express JS](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)