const Prescription = require("../models/Prescription");
require('dotenv').config(); // Load environment variables


// Save prescription
const savePrescription = async (req, res) => {
  const { patientName, phone, condition, followUpDate, doctor, prescriptionDetails } = req.body;

  try {
    const prescription = new Prescription({
      patientName,
      phone,
      condition,
      followUpDate,
      doctor,
      prescriptionDetails,
    });

    await prescription.save();

    res.json({ message: "Prescription saved successfully", prescription });
  } catch (error) {
    res.status(500).json({ message: "Error saving prescription", error });
  }
};

// Generate PDF for prescription
const generatePrescriptionPDF = (req, res) => {
  // PDF generation logic here (e.g., using `pdfkit` or `jspdf`)
};

module.exports = { savePrescription, generatePrescriptionPDF };
