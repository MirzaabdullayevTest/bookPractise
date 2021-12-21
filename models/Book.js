const fs = require('fs')
const path = require('path')
const { v4: uuid } = require('uuid')

class Book {
    constructor(title, price, img) {
        this.title = title
        this.price = price
        this.img = img
        this.id = uuid()
    }

    toData() {
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        }
    }

    async save() {
        const books = await Book.getAll() // eski massiv ma'lumotlar bor
        const book = this.toData() // biz jo'natayotgan obyekt
        books.push(book)  // obyekt qo'shildi
        return new Promise((res, rej) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'db.json'),
                JSON.stringify(books),
                (err) => {
                    if (err) rej(err)
                    else res()
                }
            )
        })
    }

    static getAll() {
        return new Promise((res, rej) => {
            fs.readFile(path.join(__dirname, '..', 'data', 'db.json'), 'utf-8',
                (err, data) => {
                    if (err) rej(err)
                    else res(JSON.parse(data))
                })
        })
    }

    static async update(title, price, img, id) {
        const books = await Book.getAll() // massiv

        const book = {
            title,
            price,
            img,
            id
        }
        const idx = books.findIndex(book => book.id === id) // id lar teng bo'lsa index kalit qaytaradi // Number // son 0 1 2 3
        books[idx] = book

        return new Promise((res, rej) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'db.json'),
                JSON.stringify(books),
                (err) => {
                    if (err) rej(err)
                    else res()
                }
            )
        })
    }

    static async delete(id) {
        let books = await Book.getAll()
        books = books.filter(book => book.id !== id) // [{}]

        return new Promise((res, rej) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'db.json'),
                JSON.stringify(books),
                (err) => {
                    if (err) rej(err)
                    else res()
                }
            )
        })
    }

    static async getById(id) {
        const books = await Book.getAll()//massiv
        return books.filter(book => book.id === id)[0] // [{}] bitta obj dan iborat massiv qaytadi // [0] obj ga murojat
    }

}

module.exports = Book