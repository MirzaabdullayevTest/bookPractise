const { Router } = require('express')
const router = Router()

router.post('/buy', async (req, res) => {
    // req.body.id
    // await Card.add(req.body.id)
    // res.redirect('/card')
})

router.get('/', async (req, res) => {
    const card = await Card.fetch()  // korzinadagi hamma kitoblari chiqaradi
    res.render('card', {
        books: card.books, // massiv
        price: card.price
    })
})

router.delete('/remove/:id', async (req, res) => {
    const card = await Card.remove(req.params.id)
    res.status(200).json(card)  // yangi hosil bo'lgan cartani klientga qaytardik
})

module.exports = router