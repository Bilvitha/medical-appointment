// Show Sign Up form
document.getElementById('signupBtn').addEventListener('click', function () {
  document.getElementById('authSection').style.display = 'none';
  document.getElementById('signupSection').style.display = 'block';
});

// Handle Sign Up
document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission

  // Here you would typically save the signup data to your backend
  alert('Account created successfully! Please log in.');

  // Switch back to login form
  document.getElementById('signupSection').style.display = 'none';
  document.getElementById('authSection').style.display = 'block';
});

// Handle Login
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission

  // Here you would typically validate login credentials against your backend
  // For demo purposes, show the appointment section directly
  document.getElementById('authSection').style.display = 'none';
  document.getElementById('appointmentSection').style.display = 'block';
});

// Handle appointment booking
document.getElementById('appointmentForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission

  // Collect form data
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const date = document.getElementById('date').value;
  const doctor = document.getElementById('doctor').value;
  const reason = document.getElementById('reason').value;

  // Display a confirmation message
  document.getElementById('message').innerText = `Successfully booked appointment for ${name} with ${doctor} on ${date}.`;
  
  // Here you would typically send the appointment data to your backend
});
