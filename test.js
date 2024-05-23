const { spawn } = require('child_process');
const http = require('http');

const server = http.createServer((req, res) => {
  callPythonScript();
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Node.js server is running!\n');
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

function callPythonScript() {
  const pythonProcess = spawn('python', ['test.py']);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python script output: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Error from Python script: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python script exited with code ${code}`);
  });
}
