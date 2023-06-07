const Mongoose = require("mongoose");
const authorize = require('./authorize/authorize.js')
const path = require('path');
const MoviesModel = Mongoose.model("movies", {
    id: String,
    name: String,
    smallImageURl: String,
    shortDescription: String,
    director: String,
    actors: String,
    categories: String,
    releaseDate: Date,
    duration: Number,
    rated: String,
    isShowing: Number

  });

function nhungApi(app) {
    app.get("/nhung", async (request, response) => {
        
        try {
            //var result = await UnitsModel.find().select('name level unitId').exec();
            
            response.send("asd");
        } catch (error) {
            response.status(500).send(error);
        }
        });

    app.get("/api/movies", async (request, response) =>{
        
        var result = await MoviesModel.find().exec();
        response.send(result);
    })

    app.post("/api/movies", async (request, response) => {
        try {
            var question = new MoviesModel(request.body);
            var result = await question.save();
            response.send(result);
            // var result = await question.save();
            // response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
        });

    app.put("/api/movies/:id", async (request, response) => {
            try {
                var question = await MoviesModel.findOneAndUpdate({ id: request.params.id }, request.body).exec();
                //question.set(request.body);
                var result = await question.save();
                response.send(result);
            } catch (error) {
                response.status(500).send(error);
            }
            });

    app.delete("/api/movies/:id", async (request, response) => {
            try {
                var result = await MoviesModel.deleteOne({ id: request.params.id }).exec();
                response.send(result);
            } catch (error) {
                response.status(500).send(error);
            }
    });
    
}

module.exports = nhungApi