const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema
const User = new Schema({
    fName: {type:String, maxLength: 255, required: true},
    lName: {type:String, maxLength: 255, required: true},
    email: {type:String, maxLength: 255, required: true},
    phoneNumber: {type:String, maxLength: 255},
    token: {type:String, maxLength: 255},
    slug: {type:String, slug: "email", unique: true},
})
mongoose.plugin(slug)
module.exports = mongoose.model('users', User)