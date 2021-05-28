const express = require('express');
const morgan = require('morgan')

/* Express app */
const app = express();

/* Register the view engine with .ejs */
app.set('view engine', 'ejs');

/* Listen for request */
app.listen(3000);

/* Static files Middleware */
app.use(express.static('public'));

/* 3rd party Middleware */
// https://www.npmjs.com/package/morgan
app.use(morgan('tiny'));

app.get('/', (req, res) => {
    
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];

    // res.sendFile('./views/index.html', { root: __dirname });
    res.render('index', { title: 'Home', blogs: blogs });
});

app.get('/about', (req, res) => {
    // res.sendFile('./views/about.html', { root: __dirname });
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create' });
})

/* 404 Page */
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname });
    res.status(404).render('404', { title: '404' });
})
