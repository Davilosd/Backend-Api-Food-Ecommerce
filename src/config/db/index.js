const mongoose = require('mongoose')

async function connect(){

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Languages', {
            useNewUrlParser: true,
            useUnifiedTopology: true
            
        })
        console.log('connect successfully')
    } catch (error) {
        console.log('connect failed') 

    }
}

module.exports = { connect }

