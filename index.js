const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded( { etended: true } )); // key=value&key=value
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'));

app.use(logger);

/*
app.use((req, res, next) => {
    console.log('Logging......');
    next();
});
*/

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" }
]

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

/*
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});
*/

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) { // 404
        return res.status(404).send('The course with the given ID was not found');
    }
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if(error){
        // bad request
        return res.status(400).send(error.details[0].message);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) { // 404
        return res.status(404).send('The course with the given ID was not found');
    }
    
    // validate
    // if invalid, return 400 - bad request
    
    // object destructuring
    const { error } = validateCourse(req.body);
    if(error){
        // bad request
        return res.status(400).send(error.details[0].message);
    }
    
    // update course
    course.name = req.body.name;
    // return the updated course
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) { // 404
        return res.status(404).send('The course with the given ID was not found');
    }

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    
    // return the same course
    res.send(course);
});



function validateCourse (course) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema);
}

// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});