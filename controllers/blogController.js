// MDN Naming Conventions :
// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const Blog = require('../models/blog');

// READ : Display all blog routes by cycle through the index.ejs
const blog_index = (req, res) => {
    Blog.find().sort({createdAt: -1 })
            .then((result) => {
                res.render('index', { title: 'All Blogs', blogs: result });
            })
            .catch((err) => {
                console.log(err);
            })
}

//READ : Read the corresponding id blog post when it is clicked (Route Parameter)
const blog_details = (req, res) => {
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
}

// CREATE : Render the create page
const blog_create_get = (req, res) => {
    res.render('create', { title: 'Create a new blog' });
}

//CREATE : POST request to the server by cycle through the create.ejs
const blog_create_post = (req, res) => {
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
}

//DELETE : Delete the corresponding id blog post
const blog_delete = (req, res) => {
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
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}