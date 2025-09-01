import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  reason: { type: String, required: true },
});

const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", AppointmentSchema);
export default Appointment;

