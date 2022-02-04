const express = require('express')
const app = express();
const router = require('./routes')
const mongoose = require('mongoose')

let conn =mongoose.connect("mongodb://localhost:27017/testProject",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res=>{
    console.log("MongoDB connection succesfully");
}).catch((error)=>{
    console.log(error);
})


app.use(express.json());
app.use(express.static('public'))
app.use('/v1',router)

app.listen(3000,()=>{
    console.log("server started on port 3000 succesfully");
})