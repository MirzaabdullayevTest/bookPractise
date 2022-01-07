const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    cart: {  /* kart bu korzina user sotib olgan mahsulotlar */
        items: [
            { count: { type: Number, required: true, default: 1 } },
            { bookId: { type: Schema.Types.ObjectId, required: true, ref: 'book' } }
        ]
    }
})


module.exports = model('User', userSchema)