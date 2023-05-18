const Mongoose = require("mongoose");

const Question_M_Model = Mongoose.model("questions_maths", {
    question: String,
    options: {
        0: String,
        1: String,
        2: String,
        3: String,
    },
    answer: String,
    difficulty: String

})

function questionMApi(app) {
    // UNIT
        app.post("/p_question_m", async (request, response) => {
        try {
            var question = new Question_M_Model(request.body);
            response.send(request.body);
            // var result = await question.save();
            // response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
        });
    
        app.get("/g_question_m", async (request, response) => {
        try {
            //var result = await UnitsModel.find().select('name level unitId').exec();
            var result = await Question_M_Model.find().exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
        });
    
        app.get("/g_question_m/:id", async (request, response) => {
        try {
            var question = await Question_M_Model.findById(request.params.id).exec();
            response.send(question);
        } catch (error) {
            response.status(500).send(error);
        }
        });
        
        
        app.put("/put_question_m/:id", async (request, response) => {
        try {
            var question = await Question_M_Model.findById(request.params.id).exec();
            question.set(request.body);
            var result = await question.save();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
        });
        app.delete("/d_question_m/:id", async (request, response) => {
        try {
            var result = await Question_M_Model.deleteOne({ _id: request.params.id }).exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
        });
    }

    module.exports = questionMApi