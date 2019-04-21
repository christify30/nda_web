const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const adminRoutes= require('./routes/api/adminRoute');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const dutyPosts = require('./routes/api/Dutyposts');
const testAPI = require('./routes/api/test')
const path =require('path');
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

app.get('/image/:image',(req,res)=>{
  res.sendFile(path.resolve(__dirname, 'public','uploads',req.params.image));
})
// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/dutyposts', dutyPosts);
app.use('/api/admin',adminRoutes);
app.use('/api/test', testAPI);


//app.use(express.static('public'));

app.use(express.static('build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname, 'build','index.html'));
    })

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
