const { validate } = require('joi/lib/types/alternatives');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/playground')
    .then(() => console.log('Connected to mongoDB'))
    .catch(err => console.error('Could not connect to mongoDB', err));

const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 250,
        // match: /pattern/ 
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function(v) {
                return v && v.length > 0;
            },
            message: 'A course should at leat one tag.'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: { 
        type: Number,
        required: function () {
            return this.isPublished;
        },
        min: 5,
        max: 255
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course ({
        name: "Node Course",
        category: "web",
        author: "Maaz",
        tags: [],
        isPublished: true,
        price: 15
    });
    
    try {
        const result = await course.save();
        console.log(result);
    } catch (ex) {
        console.log(ex.message);
    }
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

createCourse();