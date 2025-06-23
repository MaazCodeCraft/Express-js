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
        name: "Node Course",
        author: "Maaz",
        tags: ['Node', 'Backend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}

// createCourse();

async function getCourses () {
    const pageNumber = 2;
    const pageSize = 10;
    // /api/courses?pageNumber=2&pageSize=10

    const courses = await Course
    // .find({ price: { $gte: 10, $lte: 20 } })
    // .find({ price: { $in: [10, 15, 20] } })

    // .find()
    // .or([ { author: 'Maaz' }, { isPublished: true } ])
    // .and([])

    
    // Starts with Maa
    // .find({ author: /^Maa/ })

    // Ends with Rahman
    // .find({author: /Rahman$/i}) // i for case insensitive 

    // Contain Maaz
    // .find({ author: /.*Maaz.*/ })

    .find({ author: 'Maaz', isPublished: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .countDocuments();
    console.log(courses);
}

async function updateCourse(id) {
    // Apporach: Query First 
    // findById()
    // Modify its properties
    // save()

    /*
    const course = await Course.findById(id);
    if(!course) {
        return;
    }
    course.isPublished = true;
    course.author = 'Another Author';
    
    const result = await course.save();
    console.log(result);
    */

    // Apporach: update First 
    // update directly
    // Optionally: get the update document
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Json',
            isPublished: false
        }
    }, { new: true });
    console.log(course);
}

async function removeCourse(id) {
    // const result = await Course.deleteOne({ _id: id });
    const course = await Course.findByIdAndDelete(id);
    console.log(course);
}

removeCourse('685952ad278fcf590d78a8c7');