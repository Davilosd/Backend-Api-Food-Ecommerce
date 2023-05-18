var courseApi = 'http://localhost:3000/gtest'
var courseApi1 = 'http://localhost:3000/p_login'
const axios = require('axios')

class NewsController {

    // [get] /news
    index (req, res) {
    //     function setup(){
    //         noCanvas()
    //         console.log('running')
    //     }
    //     var courseApi = 'http://localhost:3000/gtest'
    // var a = document.getElementById('list-course')
    // getData()

    // async function getData(){
    //     const response = await fetch(courseApi)
    //     //const data = await response.text()
    //     const data = await response.json()
    //     var keys = Object.keys(data)
    //     c = ``
        
    //     for (i = 0; i < data.length; i++){
    //         c += ` <li>${data[i].name}</li> <p>${data[i].description}</p>`
    //     }
        
    //     document.querySelector("#list-courses").innerHTML = c
    //     console.log(keys)
         res.send('newss')
    // }
    //     getData();
        

    }
    show(req, res, next) {

        async function getData(){

                
                 const response = await fetch(courseApi)
            //     //const data = await response.text()
                const data = await response.json()
                 var keys = Object.keys(data)
                
                res.render('news', {
                    people: data
                })
            }
            getData()
        
        //const newsApi = await axios.get()

        }
       
    }



module.exports = new NewsController
