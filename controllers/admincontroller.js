const Appointment = require("../models/Appointment");
const Staff = require("../models/Staff");
const PatientHistory = require("../models/PatientHistory");
require('dotenv').config(); // Load environment variables


// Admin-specific functionalities
const getDashboardData = async (req, res) => {
  try {
    const totalAppointments = await Appointment.countDocuments();
    const totalStaff = await Staff.countDocuments();
    const totalPatients = await PatientHistory.distinct("patientId").length;

    res.json({
      totalAppointments,
      totalStaff,
      totalPatients,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard data", error });
  }
};

module.exports = { getDashboardData };
