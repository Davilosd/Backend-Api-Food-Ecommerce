const express = require ('express')
const router = express.Router()

const learnController = require('../app/controllers/LearnController')
router.get('/', learnController.learn)  
router.get('/quiz', learnController.quiz)
router.get('/practice', learnController.practice)
router.get('/lesson/:lid', learnController.lesson)
//router.get('/lessons/:', learnController.complete)
router.post('/lesson/:lid/complete/', learnController.complete)
module.exports = router 