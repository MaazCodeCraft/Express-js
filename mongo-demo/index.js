const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/playground')
    .then(() => console.log('Connected to mongoDB'))
    .catch(err => console.error('Could not connect to mongoDB', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course ({
        name: "Express Course",
        author: "Maaz",
        tags: ['Express', 'backened'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}

async function getCourses () {
    const courses = await Course
    .find({ author: 'Maaz', isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 })
    console.log(courses);
}

getCourses();