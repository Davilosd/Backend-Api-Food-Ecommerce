const Mongoose = require("mongoose");
const AccountModel = require('../app/models/Accounts.js')

const CompleteLessonModel = Mongoose.model("CompleteLessons",{
    email: String,
    lid: String
})

//const UserModel = require('../app/models/User.js')

function accountApi(app) {

    app.post("/p_sign_ups/:password", async (request, response) => {
        try {
            var account = new AccountModel({email: request.body.email, password: request.params.password, fname: request.body.fName, lName: request.body.lName});
            var result = await account.save();

            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    app.get("/g_completed_lessons/:email", async (request, response) =>{
        try {
            var OneAccountLessons = await CompleteLessonModel.find({ email: request.params.email }).exec();
            response.send(OneAccountLessons);
        } catch (error) {
            response.status(500).send(error);
        }
    })

    app.post("/p_acc", async (request, response) => {
        try {
            var question = new AccountModel(request.body);
            var result = await AccountModel.find({ email: request.body.email, password: request.body.password }).select('email password role fName lName phoneNumber' ).exec();//request.body.email, password: request.body.password }).exec();
            
            var result1 = await AccountModel.find().select('email password role fName lName phoneNumber').exec();
            if (result.length) {
                response.send(result)
            }
            else {
                response.send.status(400).send({
                    message: 'Sai mat khau hoac tai khoan!'
                });
            }
        } catch (error) {
            response.status(500).send(error);
        }
    });

    app.get("/g_acc", async (request, response) => {
        try {
            var result = await AccountModel.find({});
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    app.get("/g_acc/:email/:password", async (request, response) => {
        try {
            var question = await AccountModel.find({ email: request.params.email, password: request.params.password }).exec();
            response.send(question);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    app.put("/put_acc/", async (request, response) => {
        try {
            const filter = { email: request.body.email };
            const update = { $set: request.body };
            const options = { new: true };
            const updatedProfile = await AccountModel.findOneAndUpdate(filter, update, options);
            response.send(updatedProfile);
          } catch (error) {
            response.status(500).send(error);
          }
    });
    app.delete("/d_acc/:id", async (request, response) => {
        try {
            var result = await AccountModel.deleteOne({ _id: request.params.id }).exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    app.post("/p_lessonComplete", async (request, response) => {
        try {
            console.log("lessoncomplete")
            var result1 = await AccountModel.find().select('email password role').exec();
            const completeLesson = new CompleteLessonModel({email: request.body.email, lid: request.body.lid})
            if(request.body.email != "guess")
                completeLesson.save(function(err) {
                    if (err) return handleError(err);
                });
            response.send(result);
            }
         catch (error) {
            response.status(500).send(error);
        }
    })
}

module.exports = accountApi
