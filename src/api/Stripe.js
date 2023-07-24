
const stripe = require('stripe')('sk_test_51NV5WqCha8IXMuh6fOxV9hDZr2dtvaLLgNTV7M9a4TrHD9gWDWc3C46ozybt6OChoNdJkzXww0kwymASWQ4q1zrJ00JbXRFyt8');
//const stripe = new Stripe(PUBLIC_STRIPE_SECRET_KEY);
const sql = require('./db/db.js')
const express = require('express')

// This is your test secret API key.

function Stripe(app) {

app.post('/create-checkout-session', async (req, res) => {

    const customer = await stripe.customers.create({
        metadata:{
            userId: req.body.userId,
            cart: JSON.stringify(req.body.data)
        }
    })
    //console.log(typeof(req.body.cartItems))
    // const values = Object.values(req.body.cartItems)
    // const myArray = Object.values(req.body.cartItems);
    // const array2 = myArray[0]
    console.log(typeof(req.body.data))
    console.log(req.body.userData)
    const u = req.body.userData
    const line_items =req.body.data.map((item) => {
        return{
        price_data: {
            currency: 'vnd',
            product_data: {
                name: item.tenmonan,
                images: [item.hinhanh],
                description: item.mota,
                metadata:{
                    id: item.idmonan,
    
                }
            },
            unit_amount: item.gia,
        },
        quantity: item.quantity,
    }
    })
    sql.connect(`insert into donhang (tennguoinhan, diachi, sdt, trangthai) values ('${u.lname +' '+ u.name}', '
            ${u.address +', ' +u.city}', '${u.pn}', 6 );`)
            .then((results) => {
             
              //console.log('Results:', results);
              //response.send(results);
            })
            .catch((error) => {
             
              console.error('Error:', error);
              response.status(500).send(error);
            });

  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    line_items,
    mode: 'payment',
    success_url: `http://localhost:3000/success`,
    cancel_url: `http://localhost:3000/canceled`,
  });
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({url: session.url})
  //res.send('http://localhost:3000')
  //res.redirect('http://localhost:3000');
});

// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret //= "whsec_95ffdc93407d9295f619dcd5b6c8958822085834e6fd6dab9f4fcc256d24928e";

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let data;
  let eventType;
  let event;

  if(endpointSecret){
    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
        console.log("webhook verified.")
      } catch (err) {
        console.log(`Webhook Error: ${err.message}`)
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      data = event.data.object;
      eventType = event.type;
  } else {
        data = request.body.data.object;
        eventType = request.body.type;
        console.log(request.body.type)
        console.log("data:", data)
  }
  console.log(request.body.type)
  console.log("data:", data)

  if(eventType === "checkout.session.completed"){
    stripe.customers.retrieve(data.customer).then((customer) =>{
        console.log(customer)
        console.log("data:", data)
    }).catch(err => console.log("loi j day" + err.message))
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
});


}







module.exports = Stripe


