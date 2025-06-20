const express = require('express');
const router = express.Router();
const Joi = require('joi');

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" }
]

router.get('/', (req, res) => {
    res.send(courses);
});

/*
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});
*/

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) { // 404
        return res.status(404).send('The course with the given ID was not found');
    }
    res.send(course);
});

router.post('/', (req, res) => {
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


router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router;