const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, '../public')));

// Serve static files from the "scraped_data" folder
app.use('/scraped_data', express.static(path.join(__dirname, '../scraped_data')));

// Load the scraped visa data for the UK
const visaDataPath = path.join(__dirname, '../scraped_data/visaData_GB.json');
let visaData = [];
try {
    const data = fs.readFileSync(visaDataPath, 'utf8');
    visaData = JSON.parse(data);
} catch (error) {
    console.error("Error loading visa data:", error);
}

// Endpoint to fetch visa info
app.get('/visa-info', (req, res) => {
    const { nationality, destination } = req.query;

    // For now, we're only using the UK data, so nationality must be "GB"
    if (nationality !== "GB") {
        return res.status(404).json({ error: "Visa data is currently only available for UK citizens." });
    }

    // Find the visa requirements for the selected Destination
    const destinationEntry = visaData.find(entry => entry.country === destination);

    if (destinationEntry) {
        // Return the visa requirements, allowed stay, and notes
        res.json({
            nationality: nationality,
            destination: destination,
            requirement: destinationEntry.requirement,
            allowed_stay: destinationEntry.allowed_stay,
            notes: destinationEntry.notes
        });
    } else {
        // Return an error if no data is found
        res.status(404).json({ error: "No visa data found for the selected destination." });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});