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

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://192.168.1.7'];
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
// const courseSchema = new mongoose.Schema({
//     title:{
//       type:String,
//     //   required:true,
//     },
//     img:{
//       type:String,
//     //   required:true,
//     },
//     videoNumber:{
//       type:String,
//     //   required:true,
//     },
//     modulenumber:{
//       type:String,
//     //   required:true,
//     },
//     discription:{
//       type:String,
//     //   required:true,
//     },
//     tag:{
//       type:String,
//     //   required:true,
//     },
//     price:{
//         type:String,
//         // required:true,
//       },
//   },{timestamps:true});
    

// const Coursedb = mongoose.models.courses || mongoose.model("courses", courseSchema)

// // Routes
// app.post('/api/courses', async (req, res) => {

//   const { title,image, price, discription,tag, moduleCount} = req.body;

//   const newCoursedb = new Coursedb({ title,image, price, discription,tag, moduleCount  });  
//   await newCoursedb.save(); 
//   res.json(newCoursedb); 
// });


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
      required:true,
    },
    title:{
      type:String,
      required:true,
    },
    img:{
      type:String,
      required:true,
    },
    videoNumber:{
      type:String,
      required:true,
    },
    modulenumber:{
      type:String,
      required:true,
    },
    discription:{
      type:String,
      required:true,
    },
    tag:{
      type:String,
      required:true,
    }
  },{timestamps:true});
  
  const Module = mongoose.models.modules || mongoose.model("modules", moduleSchema)
    


// Routes
app.post('/api/module', async (req, res) => {

  const { title, price, discription,tag, moduleCount} = req.body;

  const newModule = new Module({ title, price, discription,tag, moduleCount  });  
  await newModule.save(); 
  res.json(newModule); 
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
    const updatedContact = await Contact.findByIdAndUpdate(contactId, { name, email, message }, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(updatedContact);
  } catch (error) {
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
    image:{
      type:String,
      required:true,
    },
    discription:{
      type:String,
      required:true,
    },
    position:{
      type:String,
      required:true,
    },
  
  },
  
  
  {timestamps:true});
  
  const Teacher = mongoose.models.teachers || mongoose.model("teachers", teacherSchema)
    


// Routes
app.post('/api/module', async (req, res) => {

  const { title, price, discription,tag, moduleCount} = req.body;

  const newModule = new Teacher({ title, price, discription,tag, moduleCount  });  
  await newModule.save(); 
  res.json(newModule); 
});

 
app.get('/api/teacher', async (req, res) => {
    try {
      if (req.query.id) {
        // If the request contains an 'id' parameter
        const course = await Teacher.findById(req.query.id);
        if (!course) {
          return res.status(404).json({ error: 'Course not found' });
        }
        return res.json(course);
      } else {
        // If the request does not contain an 'id' parameter
        const courses = await Teacher.find();
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
    const updatedContact = await Contact.findByIdAndUpdate(contactId, { name, email, message }, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});




//...........................................................................................................//


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
