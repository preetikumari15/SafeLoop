const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./routes/auth.js');
const journalRoutes = require('./routes/journal');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors(
 { 
    origin: "https://safe-loop.vercel.app" 
}
));
app.use(express.json());

app.use('/api', auth); 
app.use('/api/journal', journalRoutes);

// MongoDB connection
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// Routes
app.get('/', (req, res) => {
    res.send('SafeLoop API is running');
});

// server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});