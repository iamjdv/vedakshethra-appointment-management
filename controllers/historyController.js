const PatientHistory = require("../models/PatientHistory");
require('dotenv').config(); // Load environment variables


// Get patient history
const getPatientHistory = async (req, res) => {
  const { patientId } = req.query;

  try {
    const history = await PatientHistory.find({ patientId });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient history", error });
  }
};

// Add to history
const addToHistory = async (req, res) => {
  const { patientId, details } = req.body;

  try {
    const historyEntry = new PatientHistory({ patientId, details });
    await historyEntry.save();

    res.json({ message: "History added successfully", historyEntry });
  } catch (error) {
    res.status(500).json({ message: "Error adding history", error });
  }
};

module.exports = { getPatientHistory, addToHistory };
