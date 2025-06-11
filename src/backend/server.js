const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = 'supersecretkey';

// Dummy user data
const users = [
  { email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { email: 'user@example.com', password: 'user123', role: 'member' },
];

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ email: user.email, role: user.role }, SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ email: user.email }, SECRET, { expiresIn: '1d' });

  res.json({ token, refreshToken, user: { email: user.email, role: user.role } });
});

app.listen(3000, () => console.log('✅ Backend running on http://localhost:3000'));
