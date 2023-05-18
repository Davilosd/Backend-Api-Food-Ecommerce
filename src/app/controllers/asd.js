// var courseApi = 'http://localhost:3000/gcourses'
// function start(){
//   getCourses(renderCourses)
// }

// start()

// function getCourses(callback){
//   fetch(courseApi)
//     .then(function(response) {
//       return response.json()
//     })
//     .then(callback)
// }

// function renderCourses(courses){
//   var listCoursesBlock = document.querySelector('#list-courses')

//   var htmls = courses.map(function(course){
//     return `
//       <li>
//         <h4>${course.name}</h4>
        
//       </li>
//     `
//   })
//   console.log(courses)
//   listCoursesBlock.innerHTML = htmls.join('')
// }

const api_url = "https://randomuser.me/api/";
    async function getUser() {
      
      // Making an API call (request)
      // and getting the response back
      const response = await fetch(api_url);
      
      // Parsing it to JSON format
      const data = await response.json();
      console.log(data.results);
      
      // Retrieving data from JSON
      const user = data.results[0];
      let { title, first, last } = user.name;
      let { gender, email, phone } = user;
      let image = user.picture.large;
      let image_icon = user.picture.thumbnail;
      let age = user.dob.age;
      let { city, state, country } = user.location;
      
      let fullName = title + ". " + first + " " + last;
      document.title = fullName;
      
      // Accessing the div container and modify/add
      // elements to the containers
      document.getElementById("head").innerHTML = fullName;
      document.getElementById("email").href = "mailto:" + email;
      document.getElementById("email").innerHTML = email;
      document.getElementById("phone").href = "tel:" + phone;
      document.getElementById("phone").innerHTML = phone;
      // accessing the span container
      document.querySelector("#age").textContent = age;
      document.querySelector("#gender").textContent = gender;
      
      document.querySelector("#location").textContent 
              = city + ", " + state;
      
      document.querySelector("#country").textContent = country;
      
      // Creating a new element and appending it
      // to previously created containers
      let img = document.createElement("img");
      let img_div = document.getElementById("user-img");
      img.src = image;
      img_div.append(img);
      
      const favicon = document.getElementById("favicon");
      favicon.setAttribute("href", image_icon);
    }
      
    // Calling the function
    getUser();