// Require schema and model from mongoose
import { Schema, model, Document, ObjectId } from 'mongoose';
const opts = { toJSON: { virtuals: true, getters: true }, toObject: { getters: true, virtuals: true } }

export interface IReaction extends Document {
  reactionId: ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}
//Create a new instance of the schema class
export const reactionSchema = new Schema<IReaction>({
  // Configure individual properties using Schema Types
  reactionId: {
    type: Schema.Types.ObjectId, required: true
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: ((value: Date | undefined): string => {
      if (!value) return ''; // Handle undefined safely
      return new Date(value).toLocaleDateString();
    }) as any, // Explicitly cast the getter
}

})
export interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: IReaction[];
}
// Construct a new instance of the schema class
export const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,   // Minimum length of 1 character
      maxlength: 280, // Maximum length of 280 characters
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      get: ((value: Date | undefined): string => {
        if (!value) return ''; // Handle undefined safely
        return new Date(value).toLocaleDateString();
      }) as any, // Explicitly cast the getter
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    reactions: [reactionSchema],
  },
  opts 
);
// Create a virtual property `fullName` with a getter and setter.
thoughtSchema.virtual('reactionCount').
  get(function() { return this.reactions.length; })
// Using model() to compile a model based on the schema 'thoughtSchema'
const Thought = model('thought', thoughtSchema);

export default Thought;

