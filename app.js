var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyparser = require('body-parser');
var path = require('path');

// const route = require('./routes/route');
const messagesRoute = require('./routes/messages');
const userRoute = require('./routes/user');




var app =express();
const port=3000;

mongoose.connect('mongodb://localhost:27017/node-angular');

mongoose.connection.on('connected',()=>{
    console.log("Connected to mongoDB at 27017 ");
});

mongoose.connection.on('error',(err)=>{

    if(err){
        console.log("Error in database connection "+err);
    }
});


app.use(cors());
app.use(bodyparser.json());

app.listen(port, ()=>{
    console.log("Server started at port "+port);
})

app.use('/message', messagesRoute);
app.use('/user', userRoute)
// app.use('/', route);
app.use('/', (req,res)=>{
    res.json("Hi");
});
