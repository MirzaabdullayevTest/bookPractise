const path = require('path')
const fs = require('fs')
const Book = require('./Book')

const p = path.join(__dirname, '..', 'data', 'card.json')

class Card {
    static async add(id) {
        const book = await Book.getById(id) // kitob topildi // bitta kitob obyekt bor biz buy bosgan
        const card = await Card.fetch() // card ichidagi hamma baza bor obyekt books massiv price number
        const candidate = card.books.find(b => b.id === book.id) // bitta kitob qaytib chiqadi obyekt // null // id // title // price // img // count  min 2 {}

        if (candidate) {
            // korzinada u kitob bor uje //  demak count +1
            candidate.count++

            const idx = card.books.findIndex(b => b.id === candidate.id)  // index kalit // 0 2 2
            card.books[idx] = candidate
        } else {
            // korzinada u kitob hali yo'q // demak uni yaratamiz
            book.count = 1
            card.books.push(book)
        }

        // card.price = card.pirce + book.price
        card.price += +book.price

        return new Promise((res, rej) => {
            fs.writeFile(p, JSON.stringify(card), (err) => {
                if (err) rej(err)
                else res()
            })
        })
    }

    static async fetch() {  // card ichidagi hamma data ni olib beradi
        return new Promise((res, rej) => {
            fs.readFile(p, 'utf-8', (err, content) => {
                if (err) rej(err)
                else res(JSON.parse(content))
            })
        })
    }
}

module.exports = Card