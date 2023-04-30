require('dotenv').config;
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const JOBS = require('./jobs');
const SMTPConnection = require('nodemailer/lib/smtp-connection');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Configure mustache
app.set('views', path.join(__dirname, 'pages'));
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

app.get('/', (req, res) => {
    // res.send('Hello JOvian!'); //this is a route and a route handler - ie the function
    // res.sendFile(path.join(__dirname, 'pages/index.html'));
    res.render('index', {jobs: JOBS});
});

app.get('/jobs/:id', (req, res) => {
    // console.log('req.params', req.params);
    const id = req.params.id;
    const matchedJob = JOBS.find(job => job.id.toString() === id);
    // console.log('matchedJob', matchedJob);
    res.render('job', { job: matchedJob });
})

app.post('/jobs/:id/apply', (req, res) => {
    res.send("got the application")
})

// const transporter = nodemailer.createTransport({
//     host: smtp.mail.yahoo.com
// })

const port = process.env.PORT || 3000; // use the port variable or the port 3000 if port is not specified

app.listen(port, () => {
    console.log(`Server runing of http://localhost:${port}`);
});

