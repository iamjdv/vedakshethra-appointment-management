const Appointment = require("../models/Appointment");
const sendEmail = require("../config/mailer");

// Book a new appointment
const bookAppointment = async (req, res) => {
  const { name, email, phone, date, time, staff, service } = req.body;

  try {
    const appointment = new Appointment({
      name,
      email,
      phone,
      date,
      time,
      staff,
      service,
    });

    await appointment.save();

    // Send confirmation email
    await sendEmail(email, "Appointment Confirmation", `Your appointment is confirmed for ${date} at ${time} with ${staff}.`);

    res.json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: "Error booking appointment", error });
  }
};

// Get daily schedule
const getDailySchedule = async (req, res) => {
  const { date } = req.query;

  try {
    const schedule = await Appointment.find({ date });
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: "Error fetching schedule", error });
  }
};

module.exports = { bookAppointment, getDailySchedule };
const sendMail = require('../config/mailer');
const moment = require('moment');

// Send appointment confirmation email
const sendConfirmationEmail = (patientEmail, appointmentDetails) => {
  const subject = process.env.MAIL_CONFIRMATION_SUBJECT;
  const text = `Dear Patient, your appointment is confirmed for ${appointmentDetails.date} at ${appointmentDetails.time}.`;

  sendMail(patientEmail, subject, text);
};

// Send appointment reminder email 12 hours before the appointment
const sendReminderEmail = (patientEmail, appointmentDetails) => {
  const subject = process.env.MAIL_REMINDER_SUBJECT;
  const text = `Dear Patient, this is a reminder for your appointment tomorrow at ${appointmentDetails.time}.`;

  sendMail(patientEmail, subject, text);
};

module.exports = { sendConfirmationEmail, sendReminderEmail };
