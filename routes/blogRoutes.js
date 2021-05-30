const express = require('express');
const router = express.Router();

const Blog = require('../models/blog');

/* CRUD */

// READ : Display all blog routes by cycle through the index.ejs
router.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result });
        })
        .catch((err) => {
            console.log(err);
        })
})

//CREATE : POST request to the server by cycle through the create.ejs
router.post('/blogs', (req, res) => {
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
router.get('/blogs/:id', (req, res) => {
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
router.delete('/blogs/:id', (req, res) => {
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

module.exports = router;