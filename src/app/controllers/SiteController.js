const Course = require('../models/Course')
const { multipleMongooseToObject}  = require('../../util/mongoose')
const session = require('express-session')
var unitsApi = 'http://localhost:3000/g_units'
var lessonsApi = 'http://localhost:3000/g_lessons'
var completedLessonsApi = 'http://localhost:3000/g_completed_lessons/'

class SiteController {

    // [get] /
    index (req, res, next) {
        // // Course.find({}, function (err, courses) {
        // //     if (!err) {
        // //         res.json(courses)
        // //         return
        // //     }
        // //     res.status(400).json({ error: 'ERROR'})
        // // })

        // Course.find({})
        //     .then(courses => {
        //         res.render('home', {
        //             courses: multipleMongooseToObject(courses),
        //             session: req.session
        //         })
        //     })
        //     .catch(next)
        // //res.render('home')
        async function getData(){               
            const units = await fetch(unitsApi)
            const lessons = await fetch(lessonsApi)
            const completedLessons = await fetch(completedLessonsApi + req.session.email)
       //     //const data = await response.text()
           const data_units = await units.json()
           const data_lessons = await lessons.json()
           const data_completed = await completedLessons.json()
           const completedLid = []
           for(var i =0; i<data_completed.length;i++){
            completedLid.push(data_completed[i].lid)
           }
            //var keys = Object.keys(data)
           console.log(data_completed)
           console.log("///////////")
           res.render('home', {
               units: data_units,
               lessons: data_lessons,
               completed: completedLid,
               session: req.session
           })
       }
       getData()

    }

    search(req, res) {
        res.render('search')
    }
}

module.exports = new SiteController

