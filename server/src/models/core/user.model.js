import pkg from 'mongodb';
import bcrypt from 'bcrypt';
import { saltRounds, jwtSecret } from '../../config.js';
const { ObjectID } = pkg;

export function createUserModel (mongoose) {
  const userSchema = mongoose.Schema( {
    Name: {type: String, required: true, index: true, unique: true },
    Password: {type: String, required: true},
    Role: {type: String, required: true},
    Firstname: {type: String, required: true, default: "John"},
    Lastname: {type: String, required: true, default: "Smith"},
    Email: {type: String, required: true, default: "Siv@gmail.com"},
    Phone: {type: String, required: true, default: "19001080"},
    CartContent: {
      type: [{
          _id: false,
          ProductId: { type: String },
          Quantity: { type: Number }
      }],
      default: []
    }
  }/*,{ timestamps: true }*/);
  userSchema.pre('save', async function (next) {
    if (!this.isModified('Password')) {
      return next();
    }
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(this.Password, salt);
      this.Password = hashedPassword;
      return next();
    } catch (err) {
      return next(err);
    }
  });
  const User = mongoose.model("user", userSchema, 'User');
  return User;
};
