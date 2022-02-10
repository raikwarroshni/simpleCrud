require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./routes')
const mongoose = require('mongoose')
const { engine } = require('express-handlebars')
const path = require('path')
const { default: axios } = require('axios').create({baseUrl: "http://localhost:4000/v1/user"});
const fs = require('fs')
const handlebar = require('handlebars')
const { LOGIN_FAIL } = require('./constant/allConstant')

let conn = mongoose
  .connect('mongodb://localhost:27017/testProject', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log('MongoDB connection succesfully')
  })
  .catch((error) => {
    console.log(error)
  })

app.use(express.json())
app.use(express.static('public'))

app.engine(
  '.hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
      getFormatedNumber: (number) => {
        return new Intl.NumberFormat('en-IN', {
          maximumSignificantDigits: 3,
        }).format(number)
      },
      truncate: (str, len) => {
        if (str.length > len && str.length > 0) {
          return str.substring(0, len) + '....'
        }
        return str
      },
    },
  }),
)

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))
app.use('/v1', router)

app.get('/', async (req, res) => {
  let { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')
  return res.render('home/index', {
    total: data.length,
    posts: data,
  })
})

app.get('/post/:id', async (req, res) => {
  let { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${req.params.id}`,
  )
  let { data: comment } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${req.params.id}/comments`,
  )
  const layOut = fs
    .readFileSync(path.join(__dirname, 'views/layouts/main.hbs'))
    .toString()
  const fileData = fs
    .readFileSync(path.join(__dirname, 'views/post/details.hbs'))
    .toString()
  const templete = handlebar.compile(layOut)
  const fileTemplate = handlebar.compile(fileData)
  const html = templete({
    body: fileTemplate({
      postDetails: data,
      comment,
    }),
  })
  return res.send(html)
})

// app.get('/:id', async (req, res) => {
//     let { data } = await axios.get(`http://localhost:4000/v1/user/showUser/${id}`);
//     console.log(data,".....");
//     return res.render('home/forgetEmail', {
//       data: data,
//     })
//   })


app.listen(4000, () => {
  console.log('server started on port 4000 succesfully')
})
