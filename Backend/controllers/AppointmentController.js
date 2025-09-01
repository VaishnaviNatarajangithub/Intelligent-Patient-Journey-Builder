// controllers/AppointmentController.js
import Appointment from "../models/AppointmentModel.js";
import User from "../models/UserModel.js";
import PatientProfile from "../models/PatientProfile.js";
import DoctorProfile from "../models/DoctorProfile.js";

// ✅ Create Appointment
export const createAppointment = async (req, res) => {
  try {
    const { patientName, doctorName, date, time, reason } = req.body;

    // 1️⃣ Find patient by name
    const patientUser = await User.findOne({ name: patientName, role: "patient" });
    if (!patientUser) return res.status(404).json({ message: "Patient not found" });

    // 2️⃣ Find doctor by name in DoctorProfile
    const doctorProfile = await DoctorProfile.findOne({}).populate("userId");
    const doctorUser = await User.findOne({ name: doctorName, role: "doctor" });
    if (!doctorUser) return res.status(404).json({ message: "Doctor not found" });

    // 3️⃣ Create appointment
    const newAppointment = new Appointment({
      patientId: patientUser._id,
      doctorId: doctorUser._id,
      date,
      time,
      reason,
    });

    await newAppointment.save();

    res.status(201).json({
      message: "Appointment created successfully",
      appointment: newAppointment,
      patient: patientUser,
      doctor: doctorUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating appointment", error: error.message });
  }
};

// ✅ Get all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patientId", "name email")
      .populate("doctorId", "name email");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error: error.message });
  }
};

// ✅ Get appointment by ID
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("patientId", "name email")
      .populate("doctorId", "name email");
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointment", error: error.message });
  }
};

// ✅ Update appointment
export const updateAppointment = async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedAppointment) return res.status(404).json({ message: "Appointment not found" });
    res.status(200).json({ message: "Appointment updated successfully", appointment: updatedAppointment });
  } catch (error) {
    res.status(500).json({ message: "Error updating appointment", error: error.message });
  }
};

// ✅ Delete appointment
export const deleteAppointment = async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!deletedAppointment) return res.status(404).json({ message: "Appointment not found" });
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting appointment", error: error.message });
  }
};
