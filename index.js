const http = require('http');
const path = require('path');
const fs = require('fs');

const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  // Build File Path
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  console.log(req.url)
  // Extension of File
  let extName = path.extname(filePath);

  // Initial Content Type
  let contentType = 'text/html';

  // Check ext and set content type
  switch (extName) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
  }

  // Check if contentType is text/html but no .html file extension
  if (contentType == "text/html" && extName == "") filePath += ".html";
  
  // Read File
  fs.readFile(filePath, (err, content) => {
    if(err) {
      if(err.code == 'ENOENT'){
        // Page Not Found
        fs.readFile(
          path.join(__dirname, '404.html'),
          (err, content) => {
            res.writeHead(200, { 'Content-Type': 'text/html '});
            res.end(content, 'utf8');
          });
      } else {
        // Some Server Error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type' : contentType });
      res.end(content, 'utf8')
    }
  });


  // if (req.url === '/') {
  //   fs.readFile(
  //     path.join(__dirname, 'index.html'),
  //     (err, content) => {
  //       if (err) throw err;
  //       res.writeHead(200,{ 'Content-Type': 'text/html' });
  //       res.end(content);
  //   });
  // }
  // if (req.url === '/about') {
  //   fs.readFile(
  //     path.join(__dirname, 'about.html'),
  //     (err, content) => {
  //       if (err) throw err;
  //       res.writeHead(200,{ 'Content-Type': 'text/html' });
  //       res.end(content);
  //   });
  // }
  // if (req.url === '/contact-me') {
  //   fs.readFile(
  //     path.join(__dirname, 'contact-me.html'),
  //     (err, content) => {
  //       if (err) throw err;
  //       res.writeHead(200,{ 'Content-Type': 'text/html' });
  //       res.end(content);
  //   });
  // }
  // else {
  //   fs.readFile(
  //     path.join(__dirname, '404.html'),
  //     (err, content) => {
  //       if (err) throw err;
  //       res.writeHead(200,{ 'Content-Type': 'text/html' });
  //       res.end(content);
  //   });
  // }
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

