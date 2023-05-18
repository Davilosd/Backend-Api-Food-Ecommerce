var lessonApi = 'http://localhost:3000/g_question/'
var postLessonCompleteURL = 'http://localhost:3000/p_lessonComplete/'
var getCompleteLessons = ''
const Course = require('../models/Unit')
const { multipleMongooseToObject } = require('../../util/mongoose')


class LearnController {
    learn(req, res, next) {
        res.render('learn/learnSite')
    }
    quiz(req, res, next) {
        res.render('learn/quiz')
    }
    practice(req, res, next) {
        res.render('learn/practice')
    }
    lesson(req, res, next) {


        async function getData() {


            const response = await fetch(lessonApi)
            //     //const data = await response.text()
            const data = await response.json()
            var keys = Object.keys(data)
                
            res.render('learn/lesson', {
                lid: req.params.lid,
                token: req.session.token,
                role: req.session.role,
            })
        }
        getData()

        //const newsApi = await axios.get()

    }
    complete(req, res, next) {
        const formData = req.body;
        const lidData = req.params.lid;
        
        async function getData() {
            const response = await fetch(lessonApi + lidData +"/"+req.session.role+"/" + req.session.token)
            const data = await response.json()
            const rightAns = []
            var numRightAns = 0
            for(var i=0;i<data.length;i++){
                if(data[i].answer == formData[`q${i+1}`]){
                    numRightAns++
                    rightAns.push(1)
                }
                else{
                    rightAns.push(2)
                }
            }
            if(numRightAns == data.length){
                // neu tat ca cac cau tra loi dung thi luu lesson da hoan thanh vao tai khoan
                postLessonComplete(postLessonCompleteURL, { email: req.session.email , lid: lidData }).then((data) => {
                      res.redirect("/");
                  })
            }
            
            res.render('learn/lesson', {
                lid: lidData,
                rightAns: rightAns,
                token: req.session.token,
                role: req.session.role,
            })
        }

        // hinh nhu cai data la de chuyen data ve de luu vao database
        async function postLessonComplete(url = "", data = {}) {
            
            // Default options are marked with *
            const response = await fetch(url, {
              method: "POST", // *GET, POST, PUT, DELETE, etc.
              mode: "cors", // no-cors, *cors, same-origin
              cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
              credentials: "same-origin", // include, *same-origin, omit
              headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              redirect: "follow", // manual, *follow, error
              referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
              body: JSON.stringify(data), // body data type must match "Content-Type" header
            });    
                                       
            return response.json(); // parses JSON response into native JavaScript objects
          
        }

        getData()
        // res.render('learn/lesson',{
        //     checkAnswer: formData
        // })
    }

}




module.exports = new LearnController