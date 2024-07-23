const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;
  
  // Configuración del transporte de nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'victor.loredo.mendoza@gmail.com',
      pass: 'Chiste321'
    }
  });

  const mailOptions = {
    from: 'victor.loredo.mendoza@gmail.com',
    to: email,
    subject: 'Reset Password',
    text: 'Here is the link to reset your password: http://localhost:3000/reset-password/token'
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email' });
  }
});

app.post('/api/reset-password', (req, res) => {
  const { token, newPassword } = req.body;
  
  // Lógica para restablecer la contraseña (puede variar según la implementación)
  res.status(200).json({ message: 'Password reset successful' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  // Lógica para el inicio de sesión (puede variar según la implementación)
  res.status(200).json({ message: 'Login successful' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
