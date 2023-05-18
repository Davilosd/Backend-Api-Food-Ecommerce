

class LessonController {
    login(req, res, next){
        res.render('account/login')
    }

}


module.exports = new LessonController