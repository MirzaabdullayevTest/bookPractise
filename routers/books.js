const { Router } = require('express')
const router = Router()
const Book = require('../models/Book')

router.get('/', async (req, res) => {
    const books = await Book.getAll()

    res.render('books', {
        title: 'All books',
        books
    })
})

router.get('/view/:id', async (req, res) => {
    const book = await Book.getById(req.params.id) //obyekt

    res.render('book', {
        title: book.title,
        img: book.img,
        price: book.price,
        id: book.id,
    })
})

router.get('/add/book', (req, res) => {
    res.render('addBook', {
        title: 'Create new book'
    })
})

router.post('/add/book', async (req, res) => {
    // console.log(req.body);  // obyekt {bookName: '', ....}
    const book = new Book(req.body.bookName, req.body.bookPrice, req.body.bookImg)
    await book.save()
    res.redirect('/books')

})

module.exports = router