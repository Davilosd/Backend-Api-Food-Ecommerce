const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')



const Schema = mongoose.Schema

const Course = new Schema({
    name: {type:String, maxLength: 255, required: true},
    description: {type:String, maxLength: 255},
    image: {type:String, maxLength: 255},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    slug: {type:String, slug: "name", unique: true},
})

// Adds plugin
mongoose.plugin(slug)
Course.plugin(mongooseDelete, { 
    deletedAt : true,
    overrideMethods: 'all',
})

module.exports = mongoose.model('Course', Course)

