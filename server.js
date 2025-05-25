done

Machine
Excellent. Now for the server script itself.

File 6 of 30

File Path: server.js (This should be at the root of your epicdev repository)

Instructions for GitHub Web UI:

Go to your repository: https://github.com/Sm0k367/epicdev
Click the "Add file" button.
Select "Create new file".
In the "Name your file..." box, type server.js.
Paste the content below into the editor.
Scroll down and click "Commit new file".
Content for server.js:

// Epic Tech AI Dev 2.0 - Proof of Concept Server
// Simple Node.js server to demonstrate the platform

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 8080; // GitHub Codespaces often uses 8080, or other dynamic port
const HOSTNAME = '0.0.0.0'; // Listen on all available network interfaces

// MIME types for different file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.md': 'text/markdown; charset=UTF-8', // Serve markdown as text
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Simple routing for main entry points
const routes = {
    '/': '/dashboard/public/index.html', // Main dashboard
    '/dashboard': '/dashboard/public/index.html',
    '/sample-project': '/projects/sample_landing_page/src/index.html', // AI-generated sample
    '/landing-page': '/projects/sample_landing_page/src/index.html'
};

function serveFile(filePath, res) {
    const fullPath = path.join(__dirname, filePath); // Files are relative to where server.js is

    fs.readFile(fullPath, (err, data) => {
        if (err) {
            console.error(`Error reading file ${fullPath}: ${err.code}`);
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`
                

html
`); return; }

    const ext = path.extname(filePath).toLowerCase();
    const mimeType = mimeTypes[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(data);
});
}

function serveDirectoryListing(dirPath, reqPath, res) { const fullPath = path.join(__dirname, dirPath); fs.readdir(fullPath, { withFileTypes: true }, (err, files) => { if (err) { console.error(Error reading directory ${fullPath}: ${err.code}); res.writeHead(500, { 'Content-Type': 'text/html' }); res.end('<h1>500 - Internal Server Error</h1>


p
'); return; }

    let html = `
        

html
'; res.writeHead(200, { 'Content-Type': 'text/html' }); res.end(html); }); }

const server = http.createServer((req, res) => { const parsedUrl = url.parse(req.url, true); let pathname = decodeURIComponent(parsedUrl.pathname); // Decode URI components like %20

console.log(`Request for: ${pathname}`);

// Handle predefined routes first
if (routes[pathname]) {
    serveFile(routes[pathname], res);
    return;
}

// Construct the full path relative to the server.js location
const relativePath = pathname.startsWith('/') ? pathname.substring(1) : pathname;
const fullPath = path.join(__dirname, relativePath);


fs.stat(fullPath, (err, stats) => {
    if (err) {
        console.error(`File/Dir not found for ${pathname} (Full path: ${fullPath}): ${err.code}`);
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`
            

html
`); return; }

    if (stats.isDirectory()) {
        // If it's a directory, check for an index.html file
        const indexPath = path.join(fullPath, 'index.html');
        fs.stat(indexPath, (indexErr, indexStats) => {
            if (!indexErr && indexStats.isFile()) {
                serveFile(path.join(relativePath, 'index.html'), res);
            } else {
                // If no index.html, serve directory listing
                serveDirectoryListing(relativePath, pathname, res);
            }
        });
    } else if (stats.isFile()) {
        serveFile(relativePath, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`<h1>404 - Not Found</h1>

p
`); } }); });

server.listen(PORT, HOSTNAME, () => { console.log('🚀 Epic Tech AI Dev 2.0 - Proof of Concept Server'); console.log('='.repeat(60)); console.log(📡 Server running at: http://${HOSTNAME === '0.0.0.0' ? 'localhost' : HOSTNAME}:${PORT}); console.log( Or from other devices on your network if firewall permits.); console.log(''); console.log('🔗 Key URLs:'); console.log( Dashboard: http://localhost:${PORT}/); console.log( Sample Project: http://localhost:${PORT}/sample-project); console.log( Docs Listing: http://localhost:${PORT}/docs/); console.log(''); console.log('📁 File Browser: Navigate to any directory path to browse files.'); console.log('⚡ Live Demo: The sample landing page demonstrates AI-generated code.'); console.log(''); console.log('Press Ctrl+C to stop the server.'); console.log('='.repeat(60)); });

process.on('SIGINT', () => { console.log('\n🛑 Shutting down server...'); server.close(() => { console.log('✅ Server stopped.'); process.exit(0); }); });

