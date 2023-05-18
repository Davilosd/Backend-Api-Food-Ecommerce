const Mongoose = require("mongoose");
const authorize = require('./authorize/authorize.js')

const QuestionModel = Mongoose.model("questions", {
    
    question: String,
    answer: String,
    options: [String],
        
    lesson: String,
    img: String,
  });

function questionApi(app) {
    // UNIT
        app.post("/p_question/:role/:token", authorize.auth, authorize.authorize('admin'), async (request, response) => {
        try {
            console.log("asd")
            var questions = new QuestionModel({question: request.body.question, answer: request.body.answer, 
                options: request.body.options, lesson: request.body.lesson,img: request.body.img});
           // response.send(request.body);
            var result = await questions.save();
            console.log( questions)
            console.log("asdas" +  result)
            response.send(result);
        } catch (error) {
            console.log(error)
            response.status(500).send(error);
        }
        });
    
        app.get("/g_question", async (request, response) => {
        try {
            console.log("asd")
            //var result = await UnitsModel.find().select('name level unitId').exec();
            var result = await QuestionModel.find().exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
        });
    
        app.get("/g_question/:lesson/:role/:token", authorize.auth, authorize.authorize('user'), async (request, response) => {
        try {
            var question = await QuestionModel.find({lesson: request.params.lesson}).exec();
            response.send(question);
        } catch (error) {
            response.status(500).send(error);
        }
        });
        
        app.put("/put_question/:id/:role/:token", authorize.auth, authorize.authorize('admin'), async (request, response) => {
        try {
            var question = await QuestionModel.findById(request.params.id).exec();
            question.set(request.body);
            var result = await question.save();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
        });
        app.delete("/d_question/:id/:role/:token", authorize.auth, authorize.authorize('admmin'), async (request, response) => {
        try {
            var result = await QuestionModel.deleteOne({ _id: request.params.id }).exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
        });
    }

    module.exports = questionApi