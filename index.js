const http = require('http');
const path = require('path');
const fs = require('fs');

const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(
      path.join(__dirname, 'index.html'),
      (err, content) => {
        if (err) throw err;
        res.writeHead(200,{ 'Content-Type': 'text/html' });
        res.end(content);
    });
  }
  if (req.url === '/about') {
    fs.readFile(
      path.join(__dirname, 'about.html'),
      (err, content) => {
        if (err) throw err;
        res.writeHead(200,{ 'Content-Type': 'text/html' });
        res.end(content);
    });
  }
  if (req.url === '/contact-me') {
    fs.readFile(
      path.join(__dirname, 'contact-me.html'),
      (err, content) => {
        if (err) throw err;
        res.writeHead(200,{ 'Content-Type': 'text/html' });
        res.end(content);
    });
  }
  else {
    fs.readFile(
      path.join(__dirname, '404.html'),
      (err, content) => {
        if (err) throw err;
        res.writeHead(200,{ 'Content-Type': 'text/html' });
        res.end(content);
    });
  }
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

