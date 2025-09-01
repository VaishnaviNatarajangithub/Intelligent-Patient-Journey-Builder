import User from "../models/UserModel.js";

// Create patient profile
export const createPatientProfile = async (req, res) => {
  try {
    const { name, email, password, age, gender, medicalHistory, contactNumber } = req.body;

    const newPatient = new User({
      name,
      email,
      password,
      role: "patient",   // explicitly set role
      age,
      gender,
      medicalHistory,
      contactNumber
    });

    await newPatient.save();
    res.status(201).json({ message: "Patient profile created successfully", patient: newPatient });

  } catch (error) {
    res.status(500).json({ message: "Error creating patient profile", error: error.message });
  }
};

// Get all patients
export const getPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: "patient" });
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patients", error: error.message });
  }
};

// Get single patient by ID
export const getPatientById = async (req, res) => {
  try {
    const patient = await User.findOne({ _id: req.params.id, role: "patient" });
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient", error: error.message });
  }
};

// Update patient profile
export const updatePatientProfile = async (req, res) => {
  try {
    const updates = req.body;
    const updatedPatient = await User.findOneAndUpdate(
      { _id: req.params.id, role: "patient" },
      updates,
      { new: true }
    );
    if (!updatedPatient) return res.status(404).json({ message: "Patient not found" });
    res.status(200).json({ message: "Patient profile updated", patient: updatedPatient });
  } catch (error) {
    res.status(500).json({ message: "Error updating patient", error: error.message });
  }
};

// Delete patient profile
export const deletePatientProfile = async (req, res) => {
  try {
    const deletedPatient = await User.findOneAndDelete({ _id: req.params.id, role: "patient" });
    if (!deletedPatient) return res.status(404).json({ message: "Patient not found" });
    res.status(200).json({ message: "Patient profile deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting patient", error: error.message });
  }
};
