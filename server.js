const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');

// const { default: Courses } = require('./dashboard/src/components/courses/Courses');

const app = express();
const port = 5000;
const HOST = '0.0.0.0';

// Middleware
app.use(bodyParser.json());

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://192.168.1.7', 'http://localhost:3002'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));



app.use((req, res, next) => {
  const ip = req.ip || req.socket.remoteAddress;
  console.log(`Request from IP: ${ip}`);
  next();
});


// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: false } // Set secure to true if using https
// }));

// Connect to MongoDB
mongoose.connect('mongodb+srv://webdevrdg:Avinash9958@cluster0.eo904hp.mongodb.net/LMS', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// .............................. course ......................................//



const CourseSchema = new mongoose.Schema({
  title: String,
  price: String,
  discription: String,
  tag: String,
  moduleCount: String,
  image: String,
});

const Course = mongoose.model('Course', CourseSchema);

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append extension
  },
});

const upload = multer({ storage: storage });

app.use(express.static('data'));
app.post('/api/courses', upload.single('image'), async (req, res) => {
  const { title, price, discription, tag, moduleCount } = req.body;



  const newCourse = new Course({
    title,
    price,
    discription,
    tag,
    moduleCount,
    image: `http://localhost:5000/uploads/${req.file.filename}`
    // image: `uploads/${req.file.filename}`

  });

  try {
    await newCourse.save();
    res.status(201).json({ message: 'Course created successfully', newCourse });
  } catch (error) {
    res.status(500).json({ message: 'Error creating course', error });
  }
});

app.use('/uploads', express.static('uploads'));

app.get('/api/courses', async (req, res) => {
  try {
    if (req.query.id) {
      // If the request contains an 'id' parameter
      const course = await Course.findById(req.query.id);
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
      return res.json(course);
    } else {
      // If the request does not contain an 'id' parameter
      const courses = await Course.find();
      return res.json(courses);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});



app.put('/api/courses/:id', async (req, res) => {
  const { title, price, discription, tag, moduleCount } = req.body;
  const contactId = req.params.id;

  try {
    const updatedContact = await Course.findByIdAndUpdate(contactId, { title, price, discription, tag, moduleCount }, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.delete('/api/courses/:id', async (req, res) => {
  const contactId = req.params.id;

  try {
    const deletedContact = await Course.findByIdAndDelete(contactId);
    if (!deletedContact) {
      return res.status(404).json({ message: 'courses not found' });
    }
    res.json({ message: 'courses deleted successfully', deletedContact });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



//.............................................................................................................//


//.................................................Module......................................................//

const moduleSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  videonumber: {
    type: String,
    required: true,
  },
  modulenumber: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Module = mongoose.models.modules || mongoose.model("modules", moduleSchema)



// Routes
app.post('/api/module', upload.single('image'), async (req, res) => {
  const { course, title, discription, tag, modulenumber, videonumber } = req.body;


  console.log(req.body)



  const newModule = new Module({
    course,
    title,
    discription,
    tag,
    modulenumber,
    videonumber,

    image: `http://localhost:5000/uploads/${req.file.filename}`
    // image: `uploads/${req.file.filename}`

  });

  try {
    await newModule.save();
    res.status(201).json({ message: 'Course created successfully', newModule });
  } catch (error) {
    res.status(500).json({ message: 'Error creating course', error });
  }
});


app.get('/api/module', async (req, res) => {
  try {
    if (req.query.id) {
      // If the request contains an 'id' parameter
      const course = await Module.findById(req.query.id);
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
      return res.json(course);
    } else {
      // If the request does not contain an 'id' parameter
      const courses = await Module.find();
      return res.json(courses);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});



app.put('/api/module/:id', async (req, res) => {
  const { name, email, message } = req.body;
  const contactId = req.params.id;

  try {
    const updatedContact = await Module.findByIdAndUpdate(contactId, { $set: req.body });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.delete('/api/module/:id', async (req, res) => {
  const contactId = req.params.id;

  try {
    const deletedContact = await Module.findByIdAndDelete(contactId);
    if (!deletedContact) {
      return res.status(404).json({ message: 'courses not found' });
    }
    res.json({ message: 'courses deleted successfully', deletedContact });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


//............................................................................................................//


//..........................................Module data........................................................//


const topicSchema = new mongoose.Schema({
  name: String,
  lession: [String]
});

const lessonSchema = new mongoose.Schema({

  title: { type: String, required: true },
  language: { type: String, required: true },
  certificate: { type: Boolean, required: true },
  image: { type: String, }, // image true 
  video: { type: String, }, // video true
  price: { type: Number, required: true },
  discription1: { type: String, required: true },
  points1: [{ type: String }],
  points2: [{ type: String }],
  discription2: { type: String, required: true },
  requirements: [{ type: String }],
  rating: { type: Number, required: true },
  module: { type: String, required: true },
  description3: [{ type: String }],
  teacher: { type: String, required: true },
  course: { type: String, required: true },
  lecture: { type: Number, required: true },
  quizzes: { type: Number, required: true },
  skillLevel: { type: String, required: true },
  priceDis: { type: String, required: true },
  topic: [topicSchema],

},
  {
    timestamps: true,
  }
);

const Module_data = mongoose.models.module_data || mongoose.model("module_data", lessonSchema)


// Routes
app.post('/api/moduledata', upload.single('image'), async (req, res) => {
  const { course, title, discription, tag, modulenumber, videonumber } = req.body;
  console.log(req.body)


  try {
    await Module_data.create(req.body)
    res.status(201).json({ message: 'Course created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating course', error });
  }
});


app.get('/api/moduledata', async (req, res) => {
  try {
    if (req.query.id) {
      // If the request contains an 'id' parameter
      const course = await Module_data.findById(req.query.id);
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
      return res.json(course);
    } else {
      // If the request does not contain an 'id' parameter
      const courses = await Module_data.find();
      return res.json(courses);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});



app.put('/api/moduledata/:id', async (req, res) => {
  const { name, email, message } = req.body;
  const contactId = req.params.id;

  try {
    const updatedContact = await Module_data.findByIdAndUpdate(contactId, { $set: req.body });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.delete('/api/module/:id', async (req, res) => {
  const contactId = req.params.id;

  try {
    const deletedContact = await Module.findByIdAndDelete(contactId);
    if (!deletedContact) {
      return res.status(404).json({ message: 'courses not found' });
    }
    res.json({ message: 'courses deleted successfully', deletedContact });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//............................................................................................................//

//..........................................teachers..........................................................//



const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please write your fullname"],
  },
  image: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  Position: {
    type: String,
    required: true,
  },
  Experience: {
    type: String,
    required: true,
  },

}, { timestamps: true });

const Teacher = mongoose.models.teachers || mongoose.model("teachers", teacherSchema)



// Routes

app.get('/api/teacher', async (req, res) => {
  try {
    const blogs = await Teacher.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single blog
app.get('/api/teacher/:id', async (req, res) => {
  try {
    const blog = await Teacher.findById(req.params.id);
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new blog
app.post('/api/teacher', upload.single('image'), async (req, res) => {
  try {
    const { name, Experience, description, Position } = req.body;
    const image = req.file ? req.file.path : null;

    const newTeacher = new Teacher({
      name,
      Experience,
      description,
      Position,
      image: `http://localhost:5000/uploads/${req.file.filename}`
    });

    await newTeacher.save();

    res.status(201).json(newTeacher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add error handling middleware for multer errors
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ message: err.message });
  } else {
    next(err);
  }
});
// Update a blog
app.put('/api/teacher/:id', async (req, res) => {
  try {
    const updatedBlog = await Teacher.findByIdAndUpdate(req.params.id, req.body);
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a blog
app.delete('/api/teacher/:id', async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//...........................................................................................................//


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



//................................................webinars..................................................//





const WebinarsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    // required:true,
  },
  date: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    // required:true,
  },
  time: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
}, { timestamps: true });



const Webinars = mongoose.models.webinars || mongoose.model("webinars", WebinarsSchema)




// Routes
app.post('/api/webinar', upload.single('image'), async (req, res) => {
  // const { course, title, discription, tag, modulenumber, videonumber } = req.body;
  console.log(req.body)


  try {
    await Webinars.create(req.body)
    res.status(201).json({ message: 'Webinar created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating webinar', error });
  }
});


app.get('/api/webinar', async (req, res) => {
  try {
    // const courses = await Webinars.find()
    // res.status(200).json(courses)

    if (req.query.id) {
      // If the request contains an 'id' parameter
      const course = await Webinars.findById(req.query.id);
      if (!course) {
        return res.status(404).json({ error: 'Webinars not found' });
      }
      return res.json(course);
    } else {
      // If the request does not contain an 'id' parameter
      const courses = await Webinars.find();
      return res.json(courses);
    }


  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});



app.put('/api/webinar/:id', async (req, res) => {
  const { name, email, message } = req.body;
  const contactId = req.params.id;

  try {
    const updatedContact = await Webinars.findByIdAndUpdate(contactId, { $set: req.body });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.delete('/api/webinar/:id', async (req, res) => {
  const contactId = req.params.id;

  try {
    const deletedContact = await Webinars.findByIdAndDelete(contactId);
    if (!deletedContact) {
      return res.status(404).json({ message: 'webinar not found' });
    }
    res.json({ message: 'webinar deleted successfully', deletedContact });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//.........................................................................................................//



//..............................................BLOGS.....................................................//

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  cardImage: {
    type: String,

  },
});

const Blog = mongoose.models.blogs || mongoose.model("blogs", BlogSchema);

app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single blog
app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new blog
app.post('/api/blogs', upload.single('cardImage'), async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    cardImage: `http://localhost:5000/uploads/${req.file.filename}`
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a blog
app.put('/api/blogs/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body);
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a blog
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//.......................................................................................................//