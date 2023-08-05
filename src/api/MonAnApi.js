const Mongoose = require("mongoose");
const authorize = require('./authorize/authorize.js')
const sql = require('./db/db.js')
const path = require('path');
const { request } = require("http");
const { response } = require("express");
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
            //console.log('aaaaa' +request.params.id)
            //sql.connect(`select * from monan where idmonan=${request.params.id};`)
            //sql.connect(`select * from bandoan.donhang where donhang.iddonhang = '2'`)
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
          app.get("/mon_an_all", (request, response) => {
            //sql.connect(`select * from monan where idmonan=${request.params.id};`)
            sql.connect(`SELECT * FROM bandoan.v_all_mon_an_ch;`)
              .then((results) => {
                
               // console.log('Results:', results[0][0]);
                response.send(results);
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


          // ------------------------- CRUD MON AN ----------------------------------------------

          app.post("/tb_mon_an", (request, response) => {
            sql.connect("SELECT * FROM bandoan.toan_bo_mon_an;")
              .then((results) => {
             
                //console.log('Results:', results);
                response.json({results: results, count: results.length});
              })
              .catch((error) => {
               
                console.error('Error:', error);
                response.status(500).send(error);
              });
          });
          // them
          app.post("/them_mon_an/:idnv", (request, response) => {
            const data = request.body
            console.log('dataaaaaaaaaaaaaa '+ request.body)
            sql.connect(`call bandoan.sp_them_mon
              ('${data.idmonan}', '${data.tenmonan}', '${data.mota}','${data.hinhanh}',${data.trangthai} ,'${data.theloai}'
              , '${data.gia}', '${request.params.idnv}') `)

              .then((results) => {
             
                //console.log('Results:', results);
                response.status(200).send('Row Inserted')
              })
              .catch((error) => {
               
                console.error('Error:', error);
                response.status(500).send(error);
              });
          });

          // sua
          app.post("/sua_mon_an/:idnv", (request, response) => {
            const data = request.body
            sql.connect(`
            UPDATE monan SET 
            tenmonan = '${data.tenmonan}', mota= '${data.mota}', hinhanh='${data.hinhanh}', trangthai = ${data.trangthai}, theloai='${data.theloai}'
            WHERE idmonan = '${data.idmonan}' `)
              .then((results) => {
                //console.log('Results:', results);
                response.status(200).send('Row Inserted')
              })
              .catch((error) => {
               
                console.error('Error:', error);
                response.status(500).send(error);
              });
              
          });

          app.post('/them_gia_mon_an/:idnv', (request, response) => {
            const dataGia = request.body
            console.log('dbasd' + dataGia)
            sql.connect(`
              INSERT INTO gia (idmonan, gia, idnhanvien) 
              values ('${dataGia.id}' ,${dataGia.gia}, '${request.params.idnv}'); `)
              .then((results) => {
                console.log('Results:', results);
                response.send('Row Inserted')
              })
              .catch((error) => {
               
                console.error('Error:', error);
                response.status(500).send(error);
              });
          })

          app.post('/them_nl_cb/:idm', (request, response) => {
            const data = request.body
            
            sql.connect(`
              INSERT INTO chebien (idmonan, idnguyenlieu, soluong) 
              values ('${request.params.idm}' ,'${data.idnguyenlieu}', ${data.soluong}); `)
              .then((results) => {
                console.log('Results:', results);
                response.status(200).send('Row Inserted')
              })
              .catch((error) => {
               
                console.error('Error:', error);
                response.status(500).send(error);
              });
          })

          app.post('/sua_nl_cb/:idm', (request, response) => {
            const data = request.body
            
            sql.connect(`
              UPDATE chebien SET
              soluong = ${data.soluong} where idmonan = '${request.params.idm}' and idnguyenlieu= '${data.idnguyenlieu}'; `)
              .then((results) => {
                console.log('Results:', results);
                response.status(200).send('Row Inserted')
              })
              .catch((error) => {
               
                console.error('Error:', error);
                response.status(500).send(error);
              });
          })

          app.get('/xoa_nl_cb/:idm/:idnl', (request, response) => {
            const data = request.body
            
            
            sql.connect(`DELETE FROM chebien WHERE idmonan = '${request.params.idm}' and idnguyenlieu = '${request.params.idnl}'`)
              .then((results) => {
                console.log('Results:', results);
                response.status(200).send('Row Inserted')
              })
              .catch((error) => {
               
                console.error('Error:', error);
                response.status(500).send(error);
              });
          })

          // xoa
          app.get("/xoa_mon_an/:id", (request, response) => {
            sql.connect(`DELETE FROM monan WHERE idmonan = '${request.params.id}' `)
              .then((results) => {
             
                //console.log('Results:', results);
                response.status(200).send('Row del')
              })
              .catch((error) => {
               
                console.error('Error:', error);
                response.status(500).send(error);
              });
          });

          app.get("/gia_mon_an/:id", (request, response) => {
            sql.connect(`select * from gia where idmonan = '${request.params.id}'`)
              .then((results) => {
             
                //console.log('Results:', results);
                response.send(results)
              })
              .catch((error) => {
               
                console.error('Error:', error);
                response.status(500).send(error);
              });
          });

          app.get("/the_loai_all", (request, response) => {
            sql.connect(`select * from theloai `)
              .then((results) => {
             
                //console.log('Results:', results);
                response.send(results)
              })
              .catch((error) => {
               
                console.error('Error:', error);
                response.status(500).send(error);
              });
          });

          app.get("/che_bien/:id", (request, response) => {
            sql.connect(`select cb.idnguyenlieu, cb.soluong, nl.tennguyenlieu from chebien cb  join nguyenlieu nl 
            on nl.idnguyenlieu = cb.idnguyenlieu where idmonan='${request.params.id}' `)
              .then((results) => {
             
                //console.log('Results:', results);
                response.send(results)
              })
              .catch((error) => {
               
                console.error('Error:', error);
                response.status(500).send(error);
              });
          });

          app.get("/don_hang_nv/:id", (request, response) => {
            sql.connect(`select * from bandoan.donhang where donhang.manv = '${request.params.id}'`)
            //sql.connect(`call sp_chitietmonan('${request.params.id}');`)
              .then((results) => {
                
               // console.log('Results:', results[0][0]);
                response.send(results);
              })
              .catch((error) => {
                
                console.error('Error:', error);
                response.status(500).send(error);
              });
          });




          // ///////////////////////////CRUD MON AN ////////////////////////////////////////////
          // -------------------------  CRUD IMPORT -----------------------------------------------
          app.get("/don_nhap", (request, response) => {
            sql.connect("SELECT d.iddonnhap, d.idnhanvien, nv.ten, d.ngaynhap FROM bandoan.donnhap d join bandoan.nhanvien nv on d.idnhanvien = nv.idnhanvien;")
              .then((results) => {
             
                //console.log('Results:', results);
                response.json(results);
              })
              .catch((error) => {
               
                console.error('Error:', error);
                response.status(500).send(error);
              });
          });

          app.post("/them_don_nhap/:idnv", (request, response) => {
            sql.connect(`INSERT INTO donnhap (idnhanvien) 
            values ('${request.params.idnv}');`)
              .then((results) => {
             
                console.log('Results:', results);
                response.json(results);
              })
              .catch((error) => {
               
                console.error('Error:', error);
                response.status(500).send(error);
              });
          });

          app.post('/sua_ct_dn/:idm', (request, response) => {
            const data = request.body
            
            sql.connect(`
              UPDATE chitietdonnhap SET
              soluong = ${data.soluong}, dongia = ${data.dongia} where iddonnhap = '${request.params.idm}' and idnguyenlieu= '${data.idnguyenlieu}'; `)
              .then((results) => {
                console.log('Results:', results);
                response.status(200).send('Row Inserted')
              })
              .catch((error) => {
               
                console.error('Error:', error);
                response.status(500).send(error);
              });
          })

          app.get('/xoa_ct_dn/:idm/:idnl', (request, response) => {
            const data = request.body
            
            
            sql.connect(`DELETE FROM chitietdonnhap WHERE iddonnhap = '${request.params.idm}' and idnguyenlieu = '${request.params.idnl}'`)
              .then((results) => {
                console.log('Results:', results);
                response.status(200).send('Row Inserted')
              })
              .catch((error) => {
               
                console.error('Error:', error);
                response.status(500).send(error);
              });
          })

          

          app.get("/ct_don_nhap/:id", (request, response) => {
            sql.connect(`SELECT ct.idnguyenlieu, ct.dongia, ct.soluong, nl.tennguyenlieu 
            from bandoan.chitietdonnhap ct join nguyenlieu nl on nl.idnguyenlieu = ct.idnguyenlieu where iddonnhap = ${request.params.id};`)
              .then((results) => {
             
                //console.log('Results:', results);
                response.json(results);
              })
              .catch((error) => {
               
                console.error('Error:', error);
                response.status(500).send(error);
              });
          });

          app.post("/them_ct_dn/:id", (request, response) => {
            const data = request.body
            console.log('dt' + data)
            sql.connect(`INSERT INTO chitietdonnhap (iddonnhap, idnguyenlieu, soluong, dongia) 
            values (${request.params.id},'${data.idnguyenlieu}', ${data.soluong}, ${data.dongia});`)
              .then((results) => {
             
                console.log('Results:', results);
                response.json(results);
              })
              .catch((error) => {
               
                console.error('Error:', error);
                response.status(500).send(error);
              });
          });

          app.post('/sua_ct_dn/:idm', (request, response) => {
            const data = request.body
            
            sql.connect(`
              UPDATE chitietdonnhap SET
              soluong = ${data.soluong}, dongia = ${data.dongia} where iddonnhap = '${request.params.idm}' and idnguyenlieu= '${data.idnguyenlieu}'; `)
              .then((results) => {
                console.log('Results:', results);
                response.status(200).send('Row Inserted')
              })
              .catch((error) => {
               
                console.error('Error:', error);
                response.status(500).send(error);
              });
          })

          app.get('/xoa_ct_dn/:idm/:idnl', (request, response) => {
            const data = request.body
            
            
            sql.connect(`DELETE FROM chitietdonnhap WHERE iddonnhap = '${request.params.idm}' and idnguyenlieu = '${request.params.idnl}'`)
              .then((results) => {
                console.log('Results:', results);
                response.status(200).send('Row Inserted')
              })
              .catch((error) => {
               
                console.error('Error:', error);
                response.status(500).send(error);
              });
          })

          // ///////////////////////// CRUD IMPORT ////////////////////////////////////////////


          app.get("/don_hang/:id", (request, response) => {
            sql.connect(`select d.iddonhang, d.tennguoinhan, d.diachi, d.sdt, d.trangthai, d.makh, d.manv, n.ten, n.ho, d.ngaydat
            from bandoan.donhang d 
            left join nhanvien n on d.manv = n.idnhanvien
            where d.iddonhang = ${request.params.id}`)
            //sql.connect(`call sp_chitietmonan('${request.params.id}');`)
              .then((results) => {
                
               // console.log('Results:', results[0][0]);
                response.send(results[0]);
              })
              .catch((error) => {
                
                console.error('Error:', error);
                response.status(500).send(error);
              });
          });

          app.get("/ct_don_hang/:id", (request, response) => {
            sql.connect(`call bandoan.sp_chi_tiet_don_hang('${request.params.id}')`)
            //sql.connect(`call sp_chitietmonan('${request.params.id}');`)
              .then((results) => {
                
               // console.log('Results:', results[0][0]);
                response.send(results[0]);
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


          // nhan vien giao hang
          app.get("/ds_nv_gh", (request, response) => {
            sql.connect(`SELECT * FROM bandoan.v_nv_giao_hang;`)
              .then((results) => {
             
                console.log('Results:', results[0]);
                response.send(results);
              })
              .catch((error) => {
               
                console.error('Error:', error);
                response.status(500).send(error);
              });
          });

          app.post("/nv_gh", (request, response) => {
             sql.connect(`UPDATE donhang SET manv='${request.body.idnhanvien}', trangthai = '${request.body.trangthai}' WHERE iddonhang = '${request.body.iddonhang}';`)
              .then((results) => {
             
                response.redirect(`http://localhost:8000/orders/${request.body.iddonhang}`)
              })
              .catch((error) => {
               
                console.error('Error:', error);
                response.status(500).send(error);
              });
            
          });

          // tai khoan

          app.post("/login", (request, response) => {
            sql.connect(`call bandoan.sp_dang_nhap_nv('${request.body.email}', '${request.body.password}');`)
             .then((results) => {
            
               response.send(results[0][0])
             })
             .catch((error) => {
              
               console.error('Error:', error);
               response.status(500).send(error);
             });
           
         });

         app.post("/dang_nhap_kh", (request, response) => {
          sql.connect(`call bandoan.sp_dang_nhap_kh('${request.body.email}', '${request.body.password}');`)
           .then((results) => {
          
             response.send(results[0][0])
           })
           .catch((error) => {
            
             console.error('Error:', error);
             response.status(500).send(error);
           });
         
       });

       app.post("/dang_ky", (request, response) => {
        sql.connect(`call bandoan.sp_dk_tk('${request.body.email}', '${request.body.password}','${request.body.lname}','${request.body.name}','${request.body.address}, ${request.body.city}',${request.body.gender}, '${request.body.pn}');`)
         .then((results) => {
        
           response.send('dk thanh cong')
         })
         .catch((error) => {
          
           console.error('Error:', error);
           response.status(500).send(error);
         });
       
     });



         // thong ke
         
         app.post("/thong_ke", (request, response) => {
          sql.connect(`call bandoan.sp_tong_ket_thu_chi('${request.body.tungay}', '${request.body.denngay}');`)
           .then((results) => {
          console.log('thuchi' + results[0])
             response.send(results[0])
           })
           .catch((error) => {
            
             console.error('Error:', error);
             response.status(500).send(error);
           });
         
       });



       // khach hang
       app.get("/don_hang_kh/:id", (request, response) => {
        sql.connect(`call bandoan.sp_don_hang_kh(${request.params.id});`)
         .then((results) => {
        
           response.send(results[0])
         })
         .catch((error) => {
          
           console.error('Error:', error);
           response.status(500).send(error);
         });
       
     });





     // ------------------------------------ -------- CRUD THE LOAI ----------------------------------------------------------

     app.get("/nguyen_lieu_all", (request, response) => {
      //sql.connect(`select * from monan where idmonan=${request.params.id};`)
      sql.connect(`SELECT * FROM bandoan.nguyenlieu;`)
        .then((results) => {
          
         // console.log('Results:', results[0][0]);
          response.send(results);
        })
        .catch((error) => {
          
          console.error('Error:', error);
          response.status(500).send(error);
        });
    });

    app.post('/them_nl', (request, response) => {
      const data = request.body
      
      sql.connect(`
        INSERT INTO nguyenlieu (idnguyenlieu, tennguyenlieu) 
        values ('${data.idnguyenlieu}', '${data.tennguyenlieu}'); `)
        .then((results) => {
          console.log('Results:', results);
          response.status(200).send('Row Inserted')
        })
        .catch((error) => {
         
          console.error('Error:', error);
          response.status(500).send(error);
        });
    })

    app.post('/sua_nl', (request, response) => {
      const data = request.body
      
      sql.connect(`
        UPDATE nguyenlieu SET
        tennguyenlieu = '${data.tennguyenlieu}' where idnguyenlieu= '${data.idnguyenlieu}'; `)
        .then((results) => {
          console.log('Results:', results);
          response.status(200).send('Row Inserted')
        })
        .catch((error) => {
         
          console.error('Error:', error);
          response.status(500).send(error);
        });
    })

    app.get('/xoa_nl/:idnl', (request, response) => {
      const data = request.body
      
      
      sql.connect(`DELETE FROM nguyenlieu WHERE idnguyenlieu = '${request.params.idnl}'`)
        .then((results) => {
          console.log('Results:', results);
          response.status(200).send('Row Inserted')
        })
        .catch((error) => {
         
          console.error('Error:', error);
          response.status(500).send(error);
        });
    })









     /////////////////////////////////////////////////////CRUD THE LOAI //////////////////////////////////////////////////////

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