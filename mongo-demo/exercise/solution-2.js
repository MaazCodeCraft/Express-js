const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1/mongo-exercise')
    .then(() => console.log('Connected to mongoDB'))
    .catch((err) => console.log('Could not connect to mongoDB'));

const courseScheme = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    Price: Number
});

const Course = mongoose.model('Course', courseScheme);

async function getCourses() {
    return await Course
        .find({ isPublished: true })
        .or({ tags: 'frontend', tags: 'backend' })
        .sort('-price')
        .select('name author price');
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run();