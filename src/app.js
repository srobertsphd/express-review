const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const JOBS = require('./jobs');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// Configure mustache
app.set('views', path.join(__dirname, 'pages'));
// app.set('views', `${__dirname}/pages`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

app.get('/', (req, res) => {
    // res.send('Hello JOvian!'); //this is a route and a route handler - ie the function
    // res.sendFile(path.join(__dirname, 'pages/index.html'));
    res.render('index', {jobs: JOBS});
});

const port = process.env.PORT || 3000; // use the port variable or the port 3000 if port is not specified

app.listen(port, () => {
    console.log(`Server runing of http://localhost:${port}`);
});

