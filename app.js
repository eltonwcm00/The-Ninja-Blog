const express = require('express');
const morgan = require('morgan');

/* Mongoose ODM */
const mongoose = require('mongoose');

/* Express app */
const app = express();

/* Instance of Express.js from blogRoutes */
const blogRoutes =  require('./routes/blogRoutes')


/* MongoDB connection string*/
const dbURI = 'mongodb+srv://elton:1234@ninjablog.mkarm.mongodb.net/ninjablog?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));   

/* Register the view engine with .ejs */
app.set('view engine', 'ejs');

/* Middleware, 3rd party Middleware & Static files */
app.use(express.static('public'));
app.use(express.urlencoded( {extended: true })); // Take all the URL encoded data, pass into an object,that we can use in the reqyest object 
app.use(morgan('tiny')); // https://www.npmjs.com/package/morgan

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

/* Basic Routes */ 
app.get('/', (req, res) => {
    res.redirect('/blogs');
})

app.get('/about', (req, res) => {
    // res.sendFile('./views/about.html', { root: __dirname });
    res.render('about', { title: 'About' });
})

/* Blog Routes */
app.use(blogRoutes);
// app.use('/blogs', blogRoutes);

/* 404 Page */
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname });
    res.status(404).render('404', { title: '404' });
});
