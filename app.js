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

/* Mongoose and MongoDB sandbox routes */

// INSERT
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'New blog',
        snippet: 'About my new blog',
        body: 'More about my new blog'
    });

    blog.save().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
})

// READ
app.get('/all-blogs', (req, res) => {
    Blog.find().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
})

// READ (Filter)
app.get('/single-blog', (req, res) => {
    Blog.findById('60b2369e5d61f9113c23aff9').then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
})


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
