// The main entry file that starts the server and loads all necessary configurations

const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Start Server
const PORT = process.env.PORT || 4444;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));