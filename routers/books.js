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

router.get('/update/:id', async (req, res) => {
    const book = await Book.getById(req.params.id)

    res.render('updateBook', {
        title: book.title,
        price: book.price,
        img: book.img,
        id: book.id
    })
})

router.post('/update', async (req, res) => {
    const { title, price, img, id } = req.body
    await Book.update(title, price, img, id);
    res.redirect('/books')
})

router.post('/delete', async (req, res) => {
    await Book.delete(req.body.id)
    res.redirect('/books')
})

router.post('/add/book', async (req, res) => {
    // console.log(req.body);  // obyekt {bookName: '', ....}
    const book = new Book(req.body.bookName, req.body.bookPrice, req.body.bookImg)
    await book.save()
    res.redirect('/books')
})

module.exports = router