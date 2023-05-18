const Mongoose = require("mongoose");


const UnitsModel = Mongoose.model("units", {
    
    name: String,
    level: String,
    unitId: String
    
  });

function unitApi(app) {
    // UNIT
        app.post("/p_unit", async (request, response) => {
        try {
            var question = new UnitsModel(request.body);
            response.send(request.body);
            // var result = await question.save();
            // response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
        });
    
        app.get("/g_units", async (request, response) => {
        try {
            //var result = await UnitsModel.find().select('name level unitId').exec();
            var result = await UnitsModel.find().exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
        });
    
        app.get("/g_unit/:id", async (request, response) => {
        try {
            var question = await UnitsModel.findById(request.params.id).exec();
            response.send(question);
        } catch (error) {
            response.status(500).send(error);
        }
        });
    
        app.put("/put_unit/:id", async (request, response) => {
        try {
            var question = await UnitsModel.findById(request.params.id).exec();
            question.set(request.body);
            var result = await question.save();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
        });
        app.delete("/d_unit/:id", async (request, response) => {
        try {
            var result = await UnitsModel.deleteOne({ _id: request.params.id }).exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
        });
    }

    module.exports = unitApi