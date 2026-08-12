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
    origin: "https://safe-loop.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
}
));
app.use(express.json());

app.use('/api', auth); 
app.use('/api/journal', journalRoutes);

// MongoDB connection
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
    family: 4
})
.then(() => {
    console.log("MongoDB database connection established successfully");
})
.catch((error) => {
    console.error("MongoDB connection failed:", error);
});

mongoose.connection.on("error", (error) => {
    console.error("MongoDB error:", error);
});

// Routes
app.get('/', (req, res) => {
    res.send('SafeLoop API is running');
});

// server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});