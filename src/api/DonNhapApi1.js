const Mongoose = require("mongoose");
const authorize = require('./authorize/authorize.js')
const sql = require('./db/db.js')
const path = require('path');
// const LessonsModel = Mongoose.model("MonAn", {
//     lid: String,
//     name: String,
//     uid: String,
//     exp: String,
//     hint: String,
//     hintTitle: String
//   });

function DonNhapApi(app) {
    // UNIT
        app.post("/p_lesson", async (request, response) => {
        try {
            var lesson = new LessonsModel(request.body);
            response.send(lesson);
        } catch (error) {
            response.status(500).send(error);
        }
        });
    
        app.get("/monan", (request, response) => {
            sql.connect("select * from NHANVIEN")
              .then((results) => {
                // Use the `results` here
                console.log('Results:', results);
                response.send(results);
              })
              .catch((error) => {
                // Handle the error here
                console.error('Error:', error);
                response.status(500).send(error);
              });
          });
          app.get("/p_donnhap", (request, response) => {
            a = "('1','nl01', 3),('1','nl02', 4)"
            sql.connect(`INSERT INTO donnhap VALUES ('1','3')`,` INSERT INTO chitietdonnhap VALUES ${a};`)
              .then((results) => {
                // Use the `results` here
                console.log('Results:', results);
                response.send(results);
              })
              .catch((error) => {
                // Handle the error here
                console.error('Error:', error);
                response.status(500).send(error);
              });

              
          });
          app.get("/d_donnhap", (request, response) => {
            a = "('1','nl01', 3),('1','nl02', 4)"
            sql.connect("delete from chitietdonnhap where (iddonnhap = '1')","DELETE FROM donnhap WHERE (iddonnhap = '1'); ")
              .then((results) => {
                // Use the `results` here
                console.log('Results:', results);
                response.send(results);
              })
              .catch((error) => {
                // Handle the error here
                console.error('Error:', error);
                response.status(500).send(error);
              });

              
          });

        app.get("/g_lesson/:id/:token", authorize.auth, authorize.authorize('user'), async (request, response) => {
        try {
            var question = await LessonsModel.findById(request.params.id).exec();
            response.send(question);
        } catch (error) {
            response.status(500).send(error);
        }
        });
    
        app.put("/put_lesson/:id/:role/:token", async (request, response) => {
        try {
            var question = await LessonsModel.findById(request.params.id).exec();
            question.set(request.body);
            var result = await question.save();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
        });
        app.delete("/d_lesson/:id/:role/:token", async (request, response) => {
        try {
            var result = await LessonsModel.deleteOne({ _id: request.params.id }).exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
        });

        app.get("/g_image/:filename", async (request, response) => {
            try {
                const filename = request.params.filename;
                const imagePath = path.join(__dirname, 'images', filename);
                response.sendFile(imagePath)
            } catch (error) {
                console.log(error)
                response.status(500).send(error);
            }
        });


    }

    module.exports = DonNhapApi