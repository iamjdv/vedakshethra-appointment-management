const Staff = require("../models/Staff");
const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment'); // Assuming Appointment model exists
require('dotenv').config(); // Load environment variables

// Add new staff
const addStaff = async (req, res) => {
  const { name, phone, email, role } = req.body;

  try {
    const staff = new Staff({ name, phone, email, role });
    await staff.save();

    res.json({ message: "Staff added successfully", staff });
  } catch (error) {
    res.status(500).json({ message: "Error adding staff", error });
  }
};

// Get all staff
const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: "Error fetching staff", error });
  }
};

module.exports = { addStaff, getAllStaff };


// Staff Schedule Page
router.get('/schedule', async (req, res) => {
    const date = req.query.date || new Date().toISOString().split('T')[0]; // Default to today
    const schedule = await Appointment.find({ date });
    
    res.render('staff/schedule', { schedule, selectedDate: date });
});

// Staff Appointments Page
router.get('/appointments', async (req, res) => {
    const date = req.query.appointmentDate || new Date().toISOString().split('T')[0]; // Default to today
    const appointments = await Appointment.find({ date });

    res.render('staff/appointments', { appointments, selectedDate: date });
});

module.exports = router;
