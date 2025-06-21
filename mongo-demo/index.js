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

createCourse();