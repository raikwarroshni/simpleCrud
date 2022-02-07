const express = require('express')
const app = express();
const router = require('./routes')
const mongoose = require('mongoose')
const {engine} = require('express-handlebars')
const path = require('path')

let conn =mongoose.connect("mongodb://localhost:27017/testProject",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res=>{
    console.log("MongoDB connection succesfully");
}).catch((error)=>{
    console.log(error);
})

app.use(express.json());
app.use(express.static('public'));

app.engine(".hbs", engine(
    {extname:".hbs",
    defaultLayout:"index",
}
));

app.set("view engine", ".hbs");
app.set("views", path.join(__dirname,"views"));

app.get("/",(req,res)=>{
   return res.render("layouts/index",{});
})

app.use('/v1',router)

app.listen(4000,()=>{
    console.log("server started on port 4000 succesfully");
})