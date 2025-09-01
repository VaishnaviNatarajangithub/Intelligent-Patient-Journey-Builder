import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },        // Common field
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["patient", "doctor", "admin"], 
    required: true 
  },

  // Doctor-specific fields
  specialization: { type: String },
  experience: { type: Number },
  hospital: { type: String },
  contactNumber: { type: String },

}, 
{ timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;

