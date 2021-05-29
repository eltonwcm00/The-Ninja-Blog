const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Schema */
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });

/* Model */
// model( $name-of-the-collection, $schema-name )
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;