const express = require('express');

// Express app
const app = express();

// Listen for request
app.listen(3000);

// Response and request object
app.get('/', (req, res) => {
   res.sendFile('./views/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', { root: __dirname });
});
