import mongoose from 'mongoose';
const bcrypt= require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    enum: ["admin", "superadmin", "user"],
    required: true,
    default: "user"
  },
  createdAt : {
    type: Date,
    default: Date.now()
  }
});

userSchema.methods.matchPassword = async function (password : string) {
  console.log(password, this.password);
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;