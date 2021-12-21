const express = require('express')
const app = express()
const exhbs = require('express-handlebars')
const path = require('path')


// Importing routers 
const homeRouter = require('./routers/home')
const booksRouter = require('./routers/books')
const cardRouter = require('./routers/card')

// Using exhbs
const hbs = exhbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

// Watching public folder
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }))

// Using routers
app.use('/', homeRouter)
app.use('/books', booksRouter)
app.use('/card', cardRouter)

// Listening port
const port = 3000
const host = 'localhost'

app.listen(port, host, () => {
    console.log(`Server watching ${host} ${port}...`);
})