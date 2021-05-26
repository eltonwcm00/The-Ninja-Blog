const http = require('http');
const fs = require('fs');

/* Response & request object */
const server = http.createServer((req, res) => {
    
    // Request
    console.log(req.url, req.method);

    // Response
    res.setHeader('Content-Type', 'text/html');
    
    // Send an HTML file
    fs.readFile('./views/index.html', (err, data) => {
        if(err) {
            console.log(err);
            res.end();
        } else {
            res.write(data);
            //res.end(data);
            res.end();
        }
    })
});

server.listen(3000, 'localhost', () => {
    console.log('Listening for request on port 3000');
})