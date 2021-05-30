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

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create' });
})

/* CRUD */
// READ : Display all blog routes by cycle through the index.ejs
app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result });
        })
        .catch((err) => {
            console.log(err);
        })
})

//CREATE : POST request to the server by cycle through the create.ejs
app.post('/blogs', (req, res) => {
    // console.log(req.body);
    const blog = new Blog(req.body);
    
    blog.save()
        .then((result) => {
            // Redirect user upon success
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        })
})

//READ : Read the corresponding id blog post when it is clicked (Route Parameter)
app.get('/blogs/:id', (req, res) => {
    // Catch the ./id from the URL
    const id = req.params.id;

    Blog.findById(id)
        .then((result) => {
            // Render the blog details page
            res.render('details', {blog: result, title: 'Blog Details'});
        })
        .catch((err) => {
            console.log(err);
        })
})

//DELETE : Delete the corresponding id blog post
app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
        .then((result) => {
            // Made an AJAX request for deleting, can't use redirect('/blogs).
            // The request must be made in the front-end not from the server.
            // Send JSON as the response
            res.json( {redirect: '/blogs'} );
        })
        .catch((err) => {
            console.log(err);
        })
})

/* 404 Page */
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname });
    res.status(404).render('404', { title: '404' });
});
