import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Common field
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["patient", "doctor", "admin"],
      required: true,
    },

    // Patient-specific fields
    age: { type: Number },
    gender: { type: String, enum: ["male", "female", "other"] },
    medicalHistory: [{ type: String }],  // Example: ["diabetes", "hypertension"]
    contactNumber: { type: String },
    address: { type: String },
    emergencyContact: {
      name: { type: String },
      relation: { type: String },
      phone: { type: String },
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;


