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
    // Comparision
    // eq(equal)
    // ne(not equal)
    // gt(greater than)
    // gte(greater than or eq to)
    // lt(less than)
    // lte(less than or equal to)
    // in
    // nin (not in)

    // Logical Opreators
    // or
    // and

    const courses = await Course
    // .find({ author: 'Maaz', isPublished: true })
    // .find({ price: { $gte: 10, $lte: 20 } })
    // .find({ price: { $in: [10, 15, 20] } })
    .find()
    .or([ { author: 'Maaz' }, { isPublished: true } ])
    .and([])
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 })
    console.log(courses);
}

getCourses();