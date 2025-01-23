// Require schema and model from mongoose
import { Schema, model, Document } from 'mongoose';


interface IUser extends Document {
    username: string;
    email: string;
}
// Construct a new instance of the schema class
const userSchema = new Schema<IUser>({
  // Configure individual properties using Schema Types
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Invalid email address format',
    },
   },

})

// Using model() to compile a model based on the schema 'userSchema'
const User = model('user', userSchema);

export default User;

