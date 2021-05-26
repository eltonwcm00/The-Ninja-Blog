const express = require('express');

// Express app
const app = express();

// Listen for request
app.listen(3000);

app.get('/', (req, res) => {
   res.sendFile('./views/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', { root: __dirname });
});

// Redirect
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// 404 Page
/* Not scope to any particular URL and will fire the function regardless 
   of the URL, if the code reaches at this point */
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
})
