import bcrypt from 'bcryptjs';

async function testPassword(plainTextPassword, hashedPassword) {
  const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
  if (isMatch) {
    console.log('Password is correct!');
  } else {
    console.log('Incorrect password');
  }
}

// Use your hashed password here
const hashedPassword = '$2b$12$1zp59BAVNlZMUVcbwWpXAeGCxmOsiXQfmPJs0.yLzkqJENUkeyUMq';

// Test a password (replace 'your_plain_password' with the password you want to test)
testPassword('yadav', hashedPassword);  // Test with the actual password (e.g., 'sreeja')
