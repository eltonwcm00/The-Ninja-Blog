const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const blogController = require('../controllers/blogController');

/* CRUD, import from the Controller */

// READ : Display all blog routes by cycle through the index.ejs
router.get('/blogs', blogController.blog_index);

//CREATE : POST request to the server by cycle through the create.ejs
router.post('/blogs', blogController.blog_create_post);

// CREATE : Render the create page
router.get('/blogs/create', blogController.blog_create_get);

//READ : Read the corresponding id blog post when it is clicked (Route Parameter)
router.get('/blogs/:id', blogController.blog_details);

//DELETE : Delete the corresponding id blog post
router.delete('/blogs/:id', blogController.blog_delete);

module.exports = router;