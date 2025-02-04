require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require("path");

const app = express()
app.use(cors());
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Serve static files from the img folder (or any other folders you want)
app.use('/img', express.static(path.join(__dirname, 'img')));

// Define a simple route to check if the server is running
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// connect to mongodb atlas

mongoose.connect(process.env.dblink , {dbName : 'test'} )
    .then(()=> console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB Connection Error : ", err))

// defining the schema

const userSchema = new mongoose.Schema({
    Name : String ,
    Username : String ,
    Password : String ,
    Email : String ,
    Gender : String ,
    Dob : String ,
    Phone : String ,
    Address : String ,
    termsAccepted : Boolean
})

//create Model 
const User = mongoose.model("User" , userSchema);

// to handle the submission 

app.post('/register' , async (req , res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save() ;
        res.status(201).json({ message: "User registered successfully!" })
    } catch (error){
        res.status(500).json({  error: "Failed to register user"  });
    }
});

// server start

// const PORT = process.env.PORT || 5000 ;

// app.listen(PORT , ()=> console.log(`Server running on port ${PORT}`))

// Export app (Vercel Requirement)
module.exports = app;