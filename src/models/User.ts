// Require schema and model from mongoose
import { Schema, model, Document } from 'mongoose';
//import { IThought } from './Thought.js'


interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Schema.Types.ObjectId[]; // Change from IThought[] to ObjectId[]
  friends: Schema.Types.ObjectId[]; // Change from IUser[] to ObjectId[]
}

// Construct a new instance of the schema class
const userSchema = new Schema<IUser>({
  // Configure individual properties using Schema Types
  // userId: {
  //   type: Schema.Types.ObjectId, required: true
  // },
username: { type: String, required: true, trim: true },
  email: {
    type: String, required: true, unique: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Invalid email address format',
    },
  },
  thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }] // Use ObjectId to reference the User model
})

// Using model() to compile a model based on the schema 'userSchema'
const User = model('user', userSchema);

export default User;

