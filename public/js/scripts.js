// Mock data for staff members, appointments, and schedules
const staffData = [
    { id: 1, name: "Dr. Adarsh", role: "Doctor" },
    { id: 2, name: "Athira", role: "Therapist" },
    { id: 3, name: "Pushpa", role: "Therapist" },
    { id: 4, name: "Jomit", role: "Therapist" },
];

const scheduleData = [
    { time: "09:00 AM", name: "John Doe", phone: "7760416739", staff: "Dr. Adarsh", date: "2024-12-04", details: "Follow-up check" },
    { time: "10:00 AM", name: "Jane Smith", phone: "9930467531", staff: "Dr. Neelima", date: "2024-12-04", details: "Initial consultation" }
];

// Populate staff select dropdown
const staffSelect = document.getElementById('staff');
staffData.forEach(staff => {
    const option = document.createElement('option');
    option.value = staff.name;
    option.textContent = staff.name;
    staffSelect.appendChild(option);
});

// Populate daily schedule table
const scheduleList = document.getElementById('schedule-list');
scheduleData.forEach(schedule => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${schedule.name}</td>
        <td>${schedule.phone}</td>
        <td>${schedule.staff}</td>
        <td>${schedule.date}</td>
        <td>${schedule.time}</td>
        <td>${schedule.details}</td>
    `;
    scheduleList.appendChild(row);
});

// Appointment booking form submission
document.getElementById('appointment-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const patientName = document.getElementById('patient-name').value;
    const patientEmail = document.getElementById('patient-email').value;
    const patientPhone = document.getElementById('patient-phone').value;
    const appointmentDate = document.getElementById('appointment-date').value;
    const appointmentTime = document.getElementById('appointment-time').value;
    const staffName = document.getElementById('staff').value;
    const details = document.getElementById('details').value;

    // Simulate adding appointment data
    const newAppointment = {
        patientName,
        patientEmail,
        patientPhone,
        appointmentDate,
        appointmentTime,
        staffName,
        details
    };

    // Show new appointment in the list (Appointment Management Section)
    const appointmentList = document.getElementById('appointment-list');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${newAppointment.patientName}</td>
        <td>${newAppointment.appointmentDate}</td>
        <td>${newAppointment.appointmentTime}</td>
        <td><button class="btn cancel-btn">Cancel</button></td>
    `;
    appointmentList.appendChild(newRow);

    // Reset the form
    document.getElementById('appointment-form').reset();

    // Send confirmation email
    sendConfirmationEmail(patientEmail, newAppointment);
});

// Send confirmation email
function sendConfirmationEmail(email, appointment) {
    // You can integrate an actual email service, e.g., Nodemailer or any email API.
    console.log(`Sending confirmation email to ${email}`);
    console.log(`Appointment Details: ${JSON.stringify(appointment)}`);

    // Placeholder for actual email sending (simulating with alert)
    alert(`Confirmation email sent to ${email}`);
}

// Appointment reminder email (12 hours before)
function sendReminderEmail(appointment) {
    const appointmentTime = new Date(`${appointment.appointmentDate} ${appointment.appointmentTime}`);
    const reminderTime = new Date(appointmentTime.getTime() - 12 * 60 * 60 * 1000); // 12 hours before

    // Schedule reminder email (use a job scheduler for real-world applications)
    console.log(`Reminder email for ${appointment.patientName} will be sent at ${reminderTime}`);
    // Placeholder for actual reminder sending
}

// Appointment cancellation
document.querySelectorAll('.cancel-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        const row = btn.parentElement.parentElement;
        row.remove();
        alert('Appointment canceled');
    });
});

// Add staff form submission
document.getElementById('add-staff-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const staffName = document.getElementById('staff-name').value;
    const staffEmail = document.getElementById('email-phone').value;
    const staffRole = document.getElementById('staff-role').value;

    // Add staff to the staff list
    const staffList = document.getElementById('staff-list');
    const newStaffRow = document.createElement('tr');
    newStaffRow.innerHTML = `
        <td>${staffName}</td>
        <td>${staffEmail}</td>
        <td>${staffRole}</td>
        <td><button class="btn remove-btn">Remove</button></td>
    `;
    staffList.appendChild(newStaffRow);

    // Add staff to staff data array for future reference in staff select dropdown
    staffData.push({ id: staffData.length + 1, name: staffName, role: staffRole });

    // Reset the form
    document.getElementById('add-staff-form').reset();
});

// Remove staff functionality
document.querySelectorAll('.remove-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        const row = btn.parentElement.parentElement;
        row.remove();
        alert('Staff removed');
    });
});

