import UserModel from "../models/UserModel.js";

// ---------------- CREATE DOCTOR ----------------
export const createDoctorProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user with same email exists
    const existingDoctor = await UserModel.findOne({ email, role: "doctor" });
    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    // Create doctor with role = doctor
    const newDoctor = new UserModel({
      name,
      email,
      password,
      role: "doctor", // 👈 force doctor role
    });

    await newDoctor.save();
    res.status(201).json({
      message: "Doctor profile created successfully",
      doctor: newDoctor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- GET ALL DOCTORS ----------------
export const getDoctors = async (req, res) => {
  try {
    const doctors = await UserModel.find({ role: "doctor" });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- GET DOCTOR BY ID ----------------
export const getDoctorProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await UserModel.findOne({ _id: id, role: "doctor" });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- UPDATE DOCTOR ----------------
export const updateDoctorProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDoctor = await UserModel.findOneAndUpdate(
      { _id: id, role: "doctor" }, // only update doctors
      req.body,
      { new: true }
    );
    if (!updatedDoctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json({
      message: "Doctor updated successfully",
      doctor: updatedDoctor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- DELETE DOCTOR ----------------
export const deleteDoctorProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDoctor = await UserModel.findOneAndDelete({ _id: id, role: "doctor" });
    if (!deletedDoctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
