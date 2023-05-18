const Helpers = require('../app/models/Helpers')
const Mongoose = require("mongoose");
const authorize = require('./authorize/authorize.js')
const jwt = require('jsonwebtoken');

function helpersApi(app) {

    app.get("/g_help", async (req, res) => {
        try{
            var result = await Helpers.find().exec();
            res.send(result);

        } catch (error) {
            res.status(500).send(error);
        }

    })

    // %20 la nut cach
    app.get("/g_help/:word%20", async (req, res) => {
        try{
            var result = await Helpers.find({words: req.params.word}).exec();
            res.send(result);

        } catch (error) {
            res.status(500).send(error);
        }

    })

    // TEST
    app.post("/p_help", async (request, response) => {
    try {
        var question = new QuestionModel(request.body);
        response.send(request.body);
        // var result = await question.save();
        // response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
    });

    app.get("/g_q", async (request, response) => {
    try {
        var result = await QuestionModel.find().select('description name answered').exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
    });

    app.get("/g_q/:id", async (request, response) => {
    try {
        var question = await QuestionModel.find({_id: request.params.id}).exec();
        response.send(question);
    } catch (error) {
        response.status(500).send(error);
    }
    });

    app.put("/put_q/:id", async (request, response) => {
    try {
        var question = await QuestionModel.findById(request.params.id).exec();
        question.set(request.body);
        var result = await question.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
    });
    app.delete("/d_q/:id", async (request, response) => {
    try {
        var result = await QuestionModel.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
    });
}


//////////////////////////////////////////////////

// function generateAuthToken(user) {
//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//       expiresIn: '1h'
//     });
//     return token;
//   }

//   function auth(req, res, next) {
//     console.log("console.log" +req.session.token)
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
    
//     if (req.session.token == null) {
//       return res.sendStatus(401);
//     }
  
//     jwt.verify(req.session.token, "jwtPrivateKey", (err, user) => {
//       if (err) {
//         return res.sendStatus(403);
//       }
//       console.log("2 3 " +req.session.role)
//       req.user = user;
//       next();
//     });
//   }
//   function authorize(role) {
    
//     return (req, res, next) => {
//         console.log("console.log" +req.session.role)
//       if (req.session.role !== role) {
//         return res.sendStatus(403);
//       }
//       next();
//     }
//   }
module.exports = helpersApi
