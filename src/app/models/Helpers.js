const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Helpers = new Schema({
    words: {type:String, maxLength: 255, required: true},
    from: {type:String, maxLength: 255},
    to: {type:String, maxLength: 255},
    meaning: {type:String, maxLength: 255},

})



module.exports = mongoose.model('helpers', Helpers)

