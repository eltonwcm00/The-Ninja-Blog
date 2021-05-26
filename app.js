const express = require('express');

// Express app
const app = express();

// Listen for request
app.listen(3000);

// Response and request object
app.get('/', (req, res) => {
    
    res.send('<p>this is the homepage</p>');
});