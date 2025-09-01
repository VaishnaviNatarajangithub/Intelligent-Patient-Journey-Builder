import JourneySteps from "../models/JourneySteps.js";
import User from "../models/UserModel.js"; // your User/Patient model

// ✅ Create a new journey step using patient name
export const createJourneyStep = async (req, res) => {
  try {
    const { patientName, stepName, description, status } = req.body;

    // 1️⃣ Find patient by name
    const patient = await User.findOne({ name: patientName });
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    // 2️⃣ Create journey step with patientId reference
    const newStep = new JourneySteps({
      patientId: patient._id,
      stepName,
      description,
      status
    });

    // 3️⃣ Save to DB
    await newStep.save();

    // 4️⃣ Return response
    res.status(201).json(newStep);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all journey steps (populate patient info)
export const getAllJourneySteps = async (req, res) => {
  try {
    const steps = await JourneySteps.find().populate("patientId", "name email");
    res.status(200).json(steps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get a journey step by ID
export const getJourneyStepById = async (req, res) => {
  try {
    const step = await JourneySteps.findById(req.params.id).populate("patientId", "name email");
    if (!step) return res.status(404).json({ message: "Step not found" });
    res.status(200).json(step);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all journey steps by patient name
export const getJourneyStepsByPatient = async (req, res) => {
  try {
    const { patientName } = req.params;

    // Find patient
    const patient = await User.findOne({ name: patientName });
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    // Find all steps for that patient
    const steps = await JourneySteps.find({ patientId: patient._id }).populate(
      "patientId",
      "name email"
    );
    res.status(200).json(steps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update a journey step
export const updateJourneyStep = async (req, res) => {
  try {
    const updatedStep = await JourneySteps.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("patientId", "name email");

    if (!updatedStep) return res.status(404).json({ message: "Step not found" });
    res.status(200).json(updatedStep);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Delete a journey step
export const deleteJourneyStep = async (req, res) => {
  try {
    const deletedStep = await JourneySteps.findByIdAndDelete(req.params.id);
    if (!deletedStep) return res.status(404).json({ message: "Step not found" });
    res.status(200).json({ message: "Step deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
