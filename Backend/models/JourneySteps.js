/*import mongoose from "mongoose";

const journeyStepSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  // Reference User/Patient collection
      required: true,
    },
    stepName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const JourneySteps = mongoose.model("JourneySteps", journeyStepSchema);

export default JourneySteps; */

import mongoose from "mongoose";

const JourneyStepSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  stepName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  relatedReport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Report",  // Link journey step to medical report
  }
}, { timestamps: true });

const JourneyStepModel = mongoose.models.JourneyStep || mongoose.model("JourneyStep", JourneyStepSchema);
export default JourneyStepModel;

