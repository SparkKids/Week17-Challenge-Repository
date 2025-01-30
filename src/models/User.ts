// Require schema and model from mongoose
import { Schema, model, Document } from 'mongoose';
import { IThought, thoughtSchema } from './Thought.js'


interface IUser extends Document {
  username: string;
  email: string;
  thoughts: IThought[];
  friends: IUser[];
}
// Construct a new instance of the schema class
const userSchema = new Schema<IUser>({
  // Configure individual properties using Schema Types
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
  thoughts: [thoughtSchema],
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }] // Use ObjectId to reference the User model
})

// Using model() to compile a model based on the schema 'userSchema'
const User = model('user', userSchema);

export default User;

