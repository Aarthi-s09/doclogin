const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://Aarthis09:Aarthi1234@cluster0.kexotzh.mongodb.net/HospitalAppointment?retryWrites=true&w=majority&appName=Cluster00')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const DoctorSchema = new mongoose.Schema({
  id: Number,
  name: String,
  password: String,
});

const Doctor = mongoose.model('Doctor', DoctorSchema);

// Seed some doctors (run this once to add doctors)
const seedDoctors = async () => {
  const doctors = [
    { id: 1, name: 'Dr. Mark Lee', password: 'password1' },
    { id: 2, name: 'Dr. Elizabeth Thompson', password: 'password2' },
    { id: 3, name: 'Dr. Steven Harris', password: 'password3' },
    { id: 4, name: 'Dr. Rachel Adams', password: 'password4' },
    { id: 5, name: 'Dr. Michael Brown', password: 'password5' },
    { id: 6, name: 'Dr. Susan Davis', password: 'password6' },
    { id: 7, name: 'Dr. Laura Mitchell', password: 'password7' },
    { id: 8, name: 'Dr. Kevin White', password: 'password8' },
    { id: 9, name: 'Dr. Emily Johnson', password: 'password9' },
    { id: 10, name: 'Dr. James Wilson', password: 'password10' },
    { id: 11, name: 'Dr. Sarah Martinez', password: 'password11' },
    { id: 12, name: 'Dr. Robert Green', password: 'password12' },
    { id: 13, name: 'Dr. Thomas Clark', password: 'password13' },
    { id: 14, name: 'Dr. Angela Hall', password: 'password14' },
    { id: 15, name: 'Dr. David Miller', password: 'password15' }
  ];
  for (let doc of doctors) {
    const hashedPassword = await bcrypt.hash(doc.password, 10);
    await new Doctor({ ...doc, password: hashedPassword }).save();
  }
};
// Uncomment the line below to seed doctors, then comment it again to avoid reseeding
// seedDoctors();

// Login endpoint
// Login endpoint
app.post('/api/login', async (req, res) => {
  const { id, name, password } = req.body;
  console.log('Received login request:', { id, name, password });
  
  const doctor = await Doctor.findOne({ id, name });
  if (!doctor) {
    console.log('Doctor not found');
    return res.status(401).send('Invalid ID or name');
  }
  
  const isPasswordValid = await bcrypt.compare(password, doctor.password);
  if (!isPasswordValid) {
    console.log('Invalid password');
    return res.status(401).send('Invalid password');
  }
  
  console.log('Login successful');
  res.status(200).send('Login successful');
});
