// Import the express in typescript file
import express from 'express';

// Initialize the express engine
const app: express.Application = express();

// Take a port 3333 for running server.
const port: number = 3333;

// Handling '/' Request
app.get('/', (_req, _res) => {
	_res.send("TypeScript With Expresss");
});

// Server setup
app.listen(port, () => {
	console.log(`TypeScript with Express
		http://localhost:${port}/`);
});

app.get('/login/google', passport.authenticate('google'));
