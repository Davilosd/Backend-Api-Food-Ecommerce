
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

function HoaDonApi(app) {
  
    // UNIT
        app.post("/checkout", async (request, response) => {
            const b = request.body
            sql.connect(`insert into donhang (tennguoinhan, makh, diachi, sdt, trangthai) values ('${b.lname +' '+ b.name}', ${b.idkhachhang}, 
            '${b.address }', '${b.pn}', 4 );`)
            .then((results) => {
             
              //console.log('Results:', results);
              //response.send(results);
            })
            .catch((error) => {
             
              console.error('Error:', error);
              response.status(500).send(error);
            });

            let iddonhang;
            

async function getIdDonHang() {
  try {
    const results = await sql.connect(`SELECT max(iddonhang) FROM bandoan.donhang;`);
    iddonhang = results[0]['max(iddonhang)']+1 ;
    console.log('iddonhang:', iddonhang);

    const requestBody = request.body;
    console.log(request.body)
    const cartItems = JSON.parse(requestBody.cartItems);
    console.log("b")
    console.log(cartItems)
    
    const idmonanValues = cartItems.map(item => item.idmonan);
    const giaValues = cartItems.map(item => {
      if (item.giagiam) 
        return item.giagiam 
      return item.gia
    
    });
    const giaGoc = cartItems.map(item => item.gia);

    // if(item.giagiam)
    //   giaValues = cartItems.map(item => item.giagiam);
    // else
    //   giaValues = cartItems.map(item => item.gia);
    const quantityValues = cartItems.map(item => item.quantity);

    for (let i = 0; i < cartItems.length; i++) {
      const idmonan = idmonanValues[i];
      const soluong = quantityValues[i];
      const gia = giaValues[i];
      const giagoc = giaGoc[i];

      const result = await sql.connect(`INSERT INTO chitietdonhang (iddonhang, idmonan, soluong, dongia ,giagoc) VALUES (${iddonhang}, '${idmonan}', '${soluong}', '${gia}', '${giagoc}');`);
      console.log('Inserted row:', result);
    }

    response.redirect('http://localhost:3000/success')
    
  } catch (error) {
    console.error('Error:', error);
    response.status(500).send(error);
  }
}

getIdDonHang();
        });

        app.get("/don_hang_all", (request, response) => {
            sql.connect(`select d.iddonhang, d.tennguoinhan, d.diachi, d.sdt, d.trangthai, d.makh, d.manv, n.ten, n.ho, d.ngaydat
            from bandoan.donhang d 
            left join nhanvien n on d.manv = n.idnhanvien`)
              .then((results) => {
                
                //console.log('Results:', results[0]);
                response.send(results);
              })
              .catch((error) => {
               
                console.error('Error:', error);
                response.status(500).send(error);
              });
          });

          app.get("/don_hang_shipper", (request, response) => {
            sql.connect("select * from donhang where trangthai = 5 || trangthai = 4")
              .then((results) => {
                
                //console.log('Results:', results[0]);
                response.send(results);
              })
              .catch((error) => {
               
                console.error('Error:', error);
                response.status(500).send(error);
              });
          });
          
          

        app.post("/checkout_stripe", async (request, response) => {
            try {
                
                response.send(request.body);
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


    }

    module.exports = HoaDonApi