const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const staticFolders = [
//     path.join(__dirname, 'public'),
//     path.join(__dirname, 'assets')
// ];
// // Use express.static for each folder
// staticFolders.forEach(folder => {
//     app.use(express.static(folder));
// });


app.use(express.static('public')); // Serve static files from the public directory

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Define a Hospital Form Schema
const qrCode = new mongoose.Schema({
    title: { type: String, required: true },
    name: { type: String, required: true },
    dob: { type: String, required: true },
    age: { type: Number },
    address: { type: String, required: true },
    city: { type: String },
    district: { type: String },
    state: { type: String },
    country: { type: String },
    pin: { type: String, required: true },
    aadhar: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const QRCode = mongoose.model('QRCode', qrCode);

// Endpoint to submit the hospital form
app.post('/submit-form', async (req, res) => {
    const formData = new QRCode(req.body);

    try {
        await formData.save();
        res.status(201).json({ message: 'Form submitted successfully!' });
    } catch (err) {
        console.log("Err", err);
        
        res.status(500).json({ error: 'Error saving data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
