const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')



const Schema = mongoose.Schema

const Question = new Schema({
    name: {type:String, maxLength: 255, required: true},
    description: {type:String, maxLength: 255},
    answered: {type:String, maxLength: 255},
    level: {type: Date, default: Date.now},
    slug: {type:String, slug: "name", unique: true},
})

// Adds plugin
mongoose.plugin(slug)
Question.plugin(mongooseDelete, { 
    deletedAt : true,
    overrideMethods: 'all',
})

module.exports = mongoose.model('Question', Question)