const { Router } = require('express')
const router = Router()
const Book = require('../models/Book')

router.post('/buy', async (req, res) => {
    const book = await Book.findById(req.body.id)
    await req.user.addToCart(book)
    res.redirect('/card')
})

router.get('/', async (req, res) => {
    const user = await req.user.populate('cart.items.bookId', 'title img price')
    // console.log(user.cart.items);

    let books = []

    user.cart.items.map(c => {
        books.push(c.bookId)
    })

    console.log(books);

    // console.log(user.cart.items);

    res.render('card', {
        books, // massiv
        // price: card.price
    })

    // res.json({ test: true })
})

router.delete('/remove/:id', async (req, res) => {
    const card = await Card.remove(req.params.id)
    res.status(200).json(card)  // yangi hosil bo'lgan cartani klientga qaytardik
})

module.exports = router