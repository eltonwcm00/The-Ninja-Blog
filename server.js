const http = require('http');
const fs = require('fs');

/* Response & request object */
const server = http.createServer((req, res) => {
    
    // Request
    console.log(req.url, req.method);

    // Response
    res.setHeader('Content-Type', 'text/html');
    
    // Routing
    let path = './views/';

    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'About.html';
            res.statusCode = 200;
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // send an HTML file
    fs.readFile(path, (err, data) => {
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