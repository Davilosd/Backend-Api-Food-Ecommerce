const Mongoose = require("mongoose");
const authorize = require('./authorize/authorize.js')

const LessonsModel = Mongoose.model("lessons", {
    lid: String,
    name: String,
    uid: String,
    exp: String,
    hint: String,
    hintTitle: String
  });

function lessonsApi(app) {
    // UNIT
        app.post("/p_lesson", async (request, response) => {
        try {
            var question = new LessonsModel(request.body);
            response.send(request.body);
            // var result = await question.save();
            // response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
        });
    
        app.get("/g_lessons", async (request, response) => {
        try {
            //var result = await LessonsModel.find().select('name level unitId').exec();
            var result = await LessonsModel.find().exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
        });
    
        app.get("/g_lesson/:id/:token", authorize.auth, authorize.authorize('user'), async (request, response) => {
        try {
            var question = await LessonsModel.findById(request.params.id).exec();
            response.send(question);
        } catch (error) {
            response.status(500).send(error);
        }
        });
    
        app.put("/put_lesson/:id", async (request, response) => {
        try {
            var question = await LessonsModel.findById(request.params.id).exec();
            question.set(request.body);
            var result = await question.save();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
        });
        app.delete("/d_lesson/:id", async (request, response) => {
        try {
            var result = await LessonsModel.deleteOne({ _id: request.params.id }).exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
        });
    }

    module.exports = lessonsApi