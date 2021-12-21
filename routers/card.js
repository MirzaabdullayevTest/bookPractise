const { Router } = require('express')
const router = Router()
const Card = require('../models/Card')

router.post('/buy', async (req, res) => {
    // req.body.id
    await Card.add(req.body.id)
    res.redirect('/card')
})

router.get('/', async (req, res) => {
    const card = await Card.fetch()  // korzinadagi hamma kitoblari chiqaradi
    res.render('card', {
        books: card.books, // massiv
        price: card.price
    })
})

module.exports = router