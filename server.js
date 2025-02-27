// Basic Express.js Server (server.js)
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, World! Your website is live!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
