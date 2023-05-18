const Mongoose = require("mongoose");
var courseApi = 'http://localhost:3000/p_login'
const authorize = require('./authorize/authorize.js')
const Account = require('../app/models/Accounts.js')
const User = require('../app/models/User.js')

function loginApi(app) {

    app.post("/p_sign_up", async (request, response) => {
        try {
            var account = new Account({email: request.body.email, password: request.body.password});
            var user = new User({email:request.body.email ,fName: request.body.fName, lName: request.body.lName})
            var result = await account.save();
            var result1 = await user.save();
            response.send(result);

            console.log(result1)
            //response.redirect('/g_login/a');
        } catch (error) {
            response.status(500).send(error);
        }
    });

    // app.post("/p_login", async (request, response, next) => {
    //     try {
    //         var result = await Account.find({ email: request.body.email, password: request.body.password }).select('email password role role fName lName phoneNumber' ).exec();
    //         if (result.length) {
    //             response.send(result)
    //         } 
    //         else {
    //             response.send.status(400).send({
    //                 message: 'Sai mat khau hoac tai khoan!'
    //             });
    //         }
    //     } catch (error) {
    //         response.status(500).send(error);
    //     }
    // });

    app.post('/p_login', async (request, response, next) => {
      try {
        const { email, password } = request.body;
        const user = await Account.findOne({ email, password }).select('email password role fName lName phoneNumber').exec();
        if (user) {
          const token = authorize.generateAuthToken(user);
          console.log("token " + token)
          user.token = token
          //response.send({ user, token });
          
          response.send(user);
        } else {
            
          response.status(400).send({
            message: 'Sai mat khau hoac tai khoan!',
          });
        }
      } catch (error) {
console.log("errora" + error) 
            
        response.status(500).send(error);
      }
    });
      

    app.get("/g_login", async (request, response) => {
        try {
            var result = await AccountModel.find({});
           
        } catch (error) {
            response.status(500).send(error);
        }
    });

    app.get("/g_login/:id", async (request, response) => {
        try {
            var question = await Account.find({ email: request.params.id }).exec();
            response.send(question);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    app.put("/put_login/:id", async (request, response) => {
        try {
            var question = await AccountModel.findById(request.params.id).exec();
            question.set(request.body);
            var result = await question.save();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });
    app.delete("/d_login/:id", async (request, response) => {
        try {
            var result = await AccountModel.deleteOne({ _id: request.params.id }).exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });



}

// const secretKey = process.env.JWT_SECRET_KEY;
// function generateAuthToken(user) {
//     const token = jwt.sign({ id: user.id }, "jwtPrivateKey", {
//       expiresIn: '1h'
//     });
//     return token;
//   }

//   function auth(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
    
//     if (token == null) {
//       return res.sendStatus(401);
//     }
  
//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//       if (err) {
//         return res.sendStatus(403);
//       }
  
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

module.exports = loginApi
