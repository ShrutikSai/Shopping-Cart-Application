import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  ward: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
});
const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    username: {
      type: String,
      unique: true,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
    forgotPasswordCode: String,
    loginCode: String,
    verificationCode: String,
    isVerified: { type: Boolean, default: false },
    role: {
      type: Number,
      default: 2,
    },
    addresses: [addressSchema],
  },
  { timestamps: true }
);
userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
userSchema.set("toJSON", {
  virtuals: true,
});
const User = mongoose.model("User", userSchema);
export default User;
