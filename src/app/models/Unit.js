const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')



const Schema = mongoose.Schema

const Unit = new Schema({
    name: {type:String, maxLength: 255, required: true},
    level: {type:String, maxLength: 255},
    unitId: {type:String, maxLength: 255},
    description: {type: Date, default: Date.now},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    slug: {type:String, slug: "name", unique: true},
})

// Adds plugin
mongoose.plugin(slug)
Unit.plugin(mongooseDelete, { 
    deletedAt : true,
    overrideMethods: 'all',
})

module.exports = mongoose.model('Unit', Unit)

