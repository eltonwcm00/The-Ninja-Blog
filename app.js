const express = require('express');
const morgan = require('morgan');

/* Mongoose ODM */
const mongoose = require('mongoose');
const Blog = require('./models/blog');

/* Express app */
const app = express();

/* MongoDB connection string*/
const dbURI = 'mongodb+srv://elton:1234@ninjablog.mkarm.mongodb.net/ninjablog?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));   

/* Register the view engine with .ejs */
app.set('view engine', 'ejs');

/* Static files Middleware */
app.use(express.static('public'));

/* 3rd party Middleware */
// https://www.npmjs.com/package/morgan
app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

/* Basic Routes */ 
// READ : Display all blog routes, cycle through the index.ejs
app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err);
        })
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
