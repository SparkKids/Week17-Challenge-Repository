// Require schema and model from mongoose
import { Schema, model, Document } from 'mongoose';


interface IThought extends Document {
  thought: string;
  createdAt: Date;
  username: string;
}
// Construct a new instance of the schema class
const thoughtSchema = new Schema<IThought>({
  // Configure individual properties using Schema Types
  thought: {
    type: String, required: true, minlength: 1,   // Minimum length of 1 character
    maxlength: 280 // Maximum length of 280 characters
  }, 
  createdAt: { type: Date, required: true, default: Date.now },
  username: { type: String, required: true },
})

// Using model() to compile a model based on the schema 'thoughtSchema'
const Thought = model('thought', thoughtSchema);

export default Thought;

