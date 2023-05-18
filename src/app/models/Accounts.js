const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema
const Account = new Schema({

    email: {type:String, maxLength: 255, required: true},
    password: {type:String, maxLength: 255, required: true},
    fName: {type:String, maxLength: 255},
    lName: {type:String, maxLength: 255},
    phoneNumber: {type:String, maxLength: 255},
    role:   {type:String, maxLength: 255},
    token: {type:String, maxLength: 255},
    slug: {type:String, slug: "email", unique: true},
})
mongoose.plugin(slug)


module.exports = mongoose.model('accounts', Account)