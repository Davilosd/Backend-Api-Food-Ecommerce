var profileApi = 'http://localhost:3000/g_acc/'
const Course = require('../models/Course')
const { multipleMongooseToObject}  = require('../../util/mongoose')

class AccountController {
    login(req, res, next){
        res.render('account/login')
    }
    register(req, res, next){
        res.render('account/reg')
    }
    logout(req, res, next){
        req.session.destroy()
        res.redirect('/')
    }
    profile(req,res,next){
      async function getData() {

        const email = req.session.email;
        const password = req.session.password;
        const response = await fetch(profileApi+email+"/"+password)
        //     //const data = await response.text()
        const data = await response.json()
        var keys = Object.keys(data)
        res.render('account/profile', {
            info: data[0],
            session: req.session
        })
    }
    getData()
    }
    edit_profile(req,res){
      res.render('account/edtProfile')
    }


    put_profile(req,res){
      async function postData(url = "", data = {}) {
            
        // Default options are marked with *
        const response = await fetch(url, {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
      
      postData("http://localhost:3000/put_acc/", { email: req.body.email , fName: req.body.fName, lName: req.body.lName, phoneNumber:req.body.phoneNumber}).then((data) => {
         // JSON data parsed by `data.json()` call
         console.log("asdasdasdas"+ req.body.lName + req.body.email)
        res.redirect("/account/profile")
      })
    }

    login_is_success(req, res, next){
        async function postData(url = "", data = {}) {
            
            // Default options are marked with *
            const response = await fetch(url, {
              method: "POST", // *GET, POST, PUT, DELETE, etc.
              mode: "cors", // no-cors, *cors, same-origin
              cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
              credentials: "same-origin", // include, *same-origin, omit
              headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              redirect: "follow", // manual, *follow, error
              referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
              body: JSON.stringify(data), // body data type must match "Content-Type" header
            });                                 
            return response.json(); // parses JSON response into native JavaScript objects 
        }
          postData("http://localhost:3000/p_login", { email: req.body.email , password: req.body.password, role: req.body.password}).then((data) => {
            console.log("datauser + " + data)
            if(data){
              req.session.email = data.email;
              req.session.role = data.role;
              console.log("roleeeeeeeee " +data.role)
              req.session.password = data.password;
              req.session.token = data.token;
              res.redirect("/"); 
              //
            }
            else{
              res.redirect("/account/login")
            }
          })
    }
}
module.exports = new AccountController