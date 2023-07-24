const Mongoose = require("mongoose");
const authorize = require('./authorize/authorize.js')
const sql = require('./db/db.js')
const path = require('path');
const LessonsModel = Mongoose.model("MonAn", {
    lid: String,
    name: String,
    uid: String,
    exp: String,
    hint: String,
    hintTitle: String
  });

function MonAnApi(app) {
    // UNIT
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
        app.post("/p_lesson", async (request, response) => {
        try {
            var lesson = new LessonsModel(request.body);
            response.send(lesson);
        } catch (error) {
            response.status(500).send(error);
        }
        });
    
        app.get("/mua_nhieu", (request, response) => {
            sql.connect("call sp_ban_chay();")
              .then((results) => {
                
                //console.log('Results:', results[0]);
                response.send(results[0]);
              })
              .catch((error) => {
               
                console.error('Error:', error);
                response.status(500).send(error);
              });
          });

          app.get("/khuyen_mai", (request, response) => {
            sql.connect("call sp_san_pham_km();")
              .then((results) => {
               
                //console.log('Results:', results[0]);
                response.send(results[0]);
              })
              .catch((error) => {
               
                console.error('Error:', error);
                response.status(500).send(error);
              });
          });

          app.get("/mon_moi", (request, response) => {
            sql.connect("call sp_monmoi();")
              .then((results) => {
                
                //console.log('Results:', results[0]);
                response.send(results[0]);
              })
              .catch((error) => {
                
                console.error('Error:', error);
                response.status(500).send(error);
              });
          });
          app.get("/mon_an/:id", (request, response) => {
            //sql.connect(`select * from monan where idmonan=${request.params.id};`)
            sql.connect(`call sp_chitietmonan('${request.params.id}');`)
              .then((results) => {
                
               // console.log('Results:', results[0][0]);
                response.send(results[0][0]);
              })
              .catch((error) => {
                
                console.error('Error:', error);
                response.status(500).send(error);
              });
          });

          app.get("/toan_bo_mon_an", (request, response) => {
            sql.connect("SELECT * FROM bandoan.toan_bo_mon_an;")
              .then((results) => {
             
                //console.log('Results:', results);
                response.send(results);
              })
              .catch((error) => {
               
                console.error('Error:', error);
                response.status(500).send(error);
              });
          });

          app.get("/the_loai/:id", (request, response) => {
            sql.connect(`call bandoan.sp_loc_the_loai('${request.params.id}');`)
              .then((results) => {
             
                //console.log('Results:', results[0]);
                response.send(results[0]);
              })
              .catch((error) => {
               
                console.error('Error:', error);
                response.status(500).send(error);
              });
          });

          

          app.get("/con_lai/:id", (request, response) => {
            sql.connect(`call bandoan.sp_con_lai('${request.params.id}');`)
              .then((results) => {
             
                console.log('Results:', results[0]);
                response.send(results[0][0]);
              })
              .catch((error) => {
               
                console.error('Error:', error);
                response.status(500).send(error);
              });
          });

          app.get("/monan", (request, response) => {
            sql.connect("select * from NHANVIEN")
              .then((results) => {
                
                //console.log('Results:', results);
                response.send(results);
              })
              .catch((error) => {
                
                console.error('Error:', error);
                response.status(500).send(error);
              });
          });
          app.get("/p_monan", (request, response) => {
            sql.connect(`CALL them_mon_an('3', '2','2',2,'','');`)
              .then((results) => {
                // Use the `results` here
                //console.log('Results:', results);
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
                //console.log(error)
                response.status(500).send(error);
            }
        });

        app.get("/:sx/:loc", async (request, response) => {
          console.log("asd" + request.params.sx + request.params.loc);
        
          try {
            let kq;
        
            if (request.params.sx == 'mon_moi') {
              const results = await sql.connect(`call bandoan.sp_loc_the_loai_moi('${request.params.loc}');`);
              kq = results[0];
            } else if (request.params.sx == 'mua_nhieu') {
              console.log("wtf");
              const results = await sql.connect(`call bandoan.sp_loc_the_loai_hot('${request.params.loc}');`);
              kq = results[0];
            } else if (request.params.sx == 'khuyen_mai') {
              const results = await sql.connect(`call bandoan.sp_loc_the_loai_km('${request.params.loc}');`);
              kq = results[0];
            }
        
            response.send(kq);
          } catch (error) {
            console.error('Error:', error);
            response.status(500).send(error);
          }
        });
    }

    module.exports = MonAnApi