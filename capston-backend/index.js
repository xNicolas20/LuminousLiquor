import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import 'dotenv/config'
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import sendMail from './sendMail.js'
import sendMail2 from './sendMail2.js'
import auth from "./auth.js"
import { google } from "googleapis"
import fetch from "node-fetch"
import edituser from "./routes/edituser.js";
import employee from "./routes/employee.js";
import product from "./routes/product.js";
import capstones from "./product.js";
import Edit from "./schema/user.js"
import cart from "./modules/cart.js"
import favouritesModel from "./modules/favourites.js"
// import productModel from "./modules/productsSchema.js"
import productInfo from "./modules/productInfo.js"
import postal from "./modules/postal.js"
import order from "./modules/order.js"
import messages from "./routes/messages.js";
import convo from "./routes/conversations.js"
import React, {useState} from "react"



const {OAuth2} = google.auth

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

const {CLIENT_URL} = process.env
const app= express() 
app.use(express.json()) //for sending the data to the server. However, we can't fetch data using this
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded()) //for sending the data to server. However, we can't fetch data using this
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))


/**
 * Parse Server lets you use MongoDb as a database
 * 
 */
mongoose.connect('mongodb+srv://capstone:alimoussa@capstonecluster.y9r9q.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}, () => {
console.log("Connected")
})

const userSchema = new mongoose.Schema ({
    name: String,
    email: String,
    password: String,
    phone: String,
    age: String


})



const User = new mongoose.model("User", userSchema)




var id;
//Routes

//GET method Route


app.post('/delFav', async (req,res) => {
  console.log("entered11");

  // const ab = favouritesModel.find({productID: 3, userId: 2}, (err,result) => {
  //     if (err) throw err;
  //     console.log("1 document deleted");
  //   });

  const a = favouritesModel.deleteMany({prodId: 5, userId: 2}, (err,result) => {
      if (err) throw err;
      console.log("1 document deleted");
    });
});



app.get('/dd/:id', async(req,res) => {

 
    const getId = req.params.id;
    // const a = cart.aggregate
    // [
    //     { $match : {userId : getId}},
    //     { $group : {_prodId: "$prodId", price: {$sum: "$price"}}}
    //     , (err,result) => {
    //     console.log(a);
    //     if (err){
    //         res.send(err)
    //     }
        
    //     res.send(result)
    //     console.log(result)
        


    // }]

    const pipeline = [
        { $match : {userId : getId}},
        { $group : {_id: "$userId", price: {$sum: "$price"}}}
    ];

    const aggCursor = cart.aggregate(pipeline);
    for await (const doc of aggCursor){
        res.send(doc)
        console.log(doc)
    }

})





// app.post('/updateCart/:prodId/:userId', async (req,res) => {
  
//     const prodId = req.params.prodId;
//   const userId = req.params.userId;

//     const a = cart.updateMany({prodId: prodId, userId: userId, {$set:($add:[])}}, (err,result) => {
//         if (err) throw err;
//         console.log("1 document deleted");
//       });
//   });
  




app.post('/delFav/:id/:userid', async (req,res) => {
  console.log("entered11");
  const id = req.params.id;
  const userId = req.params.userid;


  const a = favouritesModel.deleteMany({prodId: id, userId: userId}, (err,result) => {
      if (err) throw err;
      console.log("1 document deleted");
    });
});


app.post('/delCart/:id/:userId', async (req,res) => {
  console.log("entered11");
  const id = req.params.id;
  const userId = req.params.userId;

  // const ab = favouritesModel.find({productID: 3, userId: 2}, (err,result) => {
  //     if (err) throw err;
  //     console.log("1 document deleted");
  //   });

  const a = cart.deleteMany({prodId: id, userId: userId}, (err,result) => {
      if (err) throw err;
      console.log("1 document deleted");
    });
});



app.post('/favourite/:prodId/:userId/:name/:description/:price', async (req,res) => {
  const prodId = req.params.prodId;
  const userId = req.params.userId;
  const name = req.params.name;
  const description = req.params.description;
  const price = req.params.price;
  // const sale = req.params.sale;
// const userId = req.body.favUserId
  const favourite = new favouritesModel(
      {
          prodId: prodId, 
          userId:userId, 
          name: name,
          description: description,
          price: price,
      });
  console.log("entered");
  try{
      console.log("entered");
    await favourite.save("inserted data");
    console.log("done");
    console.log(favourite);
  }
  catch(err)
  {
console.log(err)
  }

});





app.post('/cart/:prodId/:userId/:name/:description/:price', async (req,res) => {
  const prodId = req.params.prodId;
  const userId = req.params.userId;
  const name = req.params.name;
  const description = req.params.description;
  const price = req.params.price;
  // const sale = req.params.sale;
// const userId = req.body.favUserId
  const cartModel = new cart(
      {
          prodId: prodId, 
          userId:userId, 
          name: name,
          description: description,
          price: price,
          quantities: 2,
          subTotal: price,
      });
  console.log("entered");
  try{
      console.log("entered");
    await cartModel.save("inserted data");
    console.log("done");
    console.log(cartModel);
  }
  catch(err)
  {
console.log(err)
  }

});















app.post('/order/:id/:amount/:address/:postal/:name', async (req,res) => {
  console.log("chal ander");
  const id = req.params.id;
  const amount = req.params.amount;
  const address = req.params.address;
  const postal = req.params.postal;
  const name = req.params.name;

  const orderNew = new order(
      {
         userId: id,
         amount: amount,
         address: address,
         postal:postal,
         name: name

      });
  console.log("entered");
  try{
      console.log("entered");
    await orderNew.save("inserted data");
    console.log("done");
    console.log(orderNew);
  }
  catch(err)
  {
console.log(err)
  }

});






app.post('/cart', async (req,res) => {
  console.log("chal ander");
//     const productID = req.body.favProductID
// const userId = req.body.favUserId
  const cartmodel = new cart(
      {
          prodId: 5, 
          userId: 2, 
          name: "Jackson Triggs Merlot",
          description: "A rich bright red to crimson color, this wine has an intense nose with lifted vanilla aromatics balanced with red currants, violets, and mulberry fruits. It is a wine that is firm and full on the palate with a subtle sweetness giving a rich mouth feel. The vanilla aromatics carry through on the palate and compliment subtle flavours of red currants, dark cherries, and chocolate. The palate is filled with dark berry fruit and the soft tannins provide a lingering finish.",
          price: 19.49,
          sale: 15.45,
          size: 750,
          stock: true,
          quantities: 3
      });
  console.log("entered");
  try{
      console.log("entered");
    await cartmodel.save("inserted data");
    console.log("done");
    console.log(favourite);
  }
  catch(err)
  {
console.log(err)
  }

});



app.post('/postal', async (req,res) => {
  console.log("chal ander");
//     const productID = req.body.favProductID
// const userId = req.body.favUserId
  const post = new postal(
      {
          postal: "T1X0L3",
          time: "4"
      });
  console.log("entered");
  try{
      console.log("entered");
    await post.save("inserted data");
    console.log("done");
    console.log(postal);
  }
  catch(err)
  {
console.log(err)
  }

});


app.get('/readPostal/:id', async (req,res) => {
  const id = ""+ req.params.id;
  console.log("entered1");
  const a = postal.find({postal: id}, (err,result) => {
      console.log(a);
      if (err){
          res.send(err)
      }
      res.send(result);
  })

});




app.get('/read/:id', async (req,res) => {
  console.log("entered1");
  const id = req.params.id;
  const a = favouritesModel.find({userId: id}, (err,result) => {
      console.log(a);
      if (err){
          res.send(err)
      }
      res.send(result);
  })

});

app.get('/readFav/:id',(req,res) =>{
  const id = req.params.id;

  const a = favouritesModel.find({userId: id}, (err,result) => {
      console.log(a);
      if (err){
          res.send(err)
      }
      res.send(result);
  })

});

// Reading if the single item is in favourites
app.get('/readFav/:prodId/:userId',(req,res) =>{
  const userId = req.params.userId;
  const prodId = req.params.prodId;
  const a = favouritesModel.find({prodId: prodId, userId: userId}, (err,result) => {
      console.log(a);
      if (err){
          res.send(err)
      }
      res.send(result);
  })

});


app.get('/readFav',(req,res) =>{
 
  // res.send(id);
  // console.log(id);

  const a = favouritesModel.find({prodId: 5, userId: 2}, (err,result) => {
      console.log(a);
      if (err){
          res.send(err)
      }
      res.send(result);
  })

});




app.get('/productInfo', async (req,res) => {
  console.log("entered1");
  const a = productInfo.find({}, (err,result) => {
      console.log(a);
      if (err){
          res.send(err)
      }
      res.send(result);
  })

});

app.get('/productInfo2', async (req,res) => {
  console.log("entered1");
  const a = productInfo.find({recent: true}, (err,result) => {
      console.log(a);
      if (err){
          res.send(err)
      }
      res.send(result);
  })

});

app.get('/productInfo3', async (req,res) => {
  console.log("entered1");
  const a = productInfo.find({recent: false}, (err,result) => {
      console.log(a);
      if (err){
          res.send(err)
      }
      res.send(result);
  })

});


app.get('/productInfo/:id', async (req,res) => {

  const getId = req.params.id;

  const a =  productInfo.find({prodId: getId}, (err,result) => {

      if (err){
          res.send(err)
      }
      res.send(result);
      
  })

});

app.get('/productPrice/:id', async (req,res) => {

    const getId = req.params.id;
  
    const a =  productInfo.find({prodId: getId}, (err,result) => {
  
        if (err){
            res.send(err)
        }
        res.send(result);
        
    }).select('price')
  
  });

  app.get('/productCartPrice/:id', async (req,res) => {

    const getId = req.params.id;
  
    const a =  cart.find({prodId: getId}, (err,result) => {
  
        if (err){
            res.send(err)
        }
        res.send(result);
        
    }).select('price')
  
  });


app.get('/readCart/:id', async (req,res) => {
 
  const getId = req.params.id;
  const a = cart.find({userId: getId}, (err,result) => {
      console.log(a);
      if (err){
          res.send(err)
      }
      res.send(result);
  })

});



app.get('/readCart/:id/:userId', async (req,res) => {
 
  const getId = req.params.id;
  const userId = req.params.userId;

  const a = cart.find({prodId:getId, userId: userId}, (err,result) => {
      console.log(a);
      if (err){
          res.send(err)
      }
      res.send(result);
  })

});









































app.post("/login", async (req,res) => {
    const {email, password} = req.body//Respond with My API when a GET reuest is made to the page
    
    User.findOne({email: email}, async (err, user) => {
        if (user){
            const match = await bcrypt.compare(password, user.password)
            console.log(match)
          if(match){
            const refresh_token = createRefreshToken({id: user._id})
            res.cookie('refreshtoken', refresh_token, {
              httpOnly: true,
              path: '/refresh_token',
              maxAge: 7*24*60*60*1000  
            })
            console.log(refresh_token)
            id = user._id.toString()
            console.log(id)
            res.send({message: "Login Success", user})
          }else{
            res.send({message: "wrong pass"})
          }
        }else{
            res.send({message : "404 Not found"})
        }
    })
    
})

app.get("/find", async (req,res)=>{

  const query = User.findById({_id: session}).select({'password' : 0})

    query.exec(function (err, val) {
        if (err) return next(err);
        res.send(val);
    })
})

app.post("/googleLogin", async (req,res) => {
 try {
  const {tokenId} = req.body;
  const verify = await client.verifyIdToken({idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID})
  console.log(verify.payload)
  console.log(tokenId)
  const {email_verified, email, name} = verify.payload
  const password = email + process.env.GOOGLE_SECRET
  console.log(password)
  const passwordHash = await bcrypt.hash(password, 12)
  console.log(passwordHash)
  console.log("here1")
  if(email_verified){
    console.log("here2")
    const user = await User.findOne({email})
    if(user){
    const match = await bcrypt.compare(password, user.password)
    if(match){
      const refresh_token = createRefreshToken({id: user._id})
      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/refresh_token',
        maxAge: 7*24*60*60*1000  
      })
      console.log(refresh_token)
      res.send({message: "Login Success", user})
    }else{
      res.send({message: "Login Failed"})
    }
  }else{
    console.log("here")
    const user = new User ({
      name,
      password: passwordHash,
      email


  })

  user.save(err => {
    console.log("Suceess 2")
    console.log(err)
    if(err) {
        return res.send({message : "error"})  
    }
    else {
        return res.send ({ message: "success", user})
       
    }
})
  }
}


 } catch (err) {
  console.log(err)
 }
})

app.post("/facebookLogin", async (req,res) => {
  try {
   const {accessToken, userID} = req.body;
   const URL = `https://graph.facebook.com/${userID}?fields=id,name,email&access_token=${accessToken}`
   const data = await fetch(URL).then(res => res.json()).then(res => {return res})
   console.log(data)
   const {email, name} = data
   if(email&&name){
   const password = email + process.env.GOOGLE_SECRET
   console.log(password)
   const passwordHash = await bcrypt.hash(password, 12)
   console.log(passwordHash)
   console.log("here1")

     console.log("here2")
     const user = await User.findOne({email})
     if(user){
     const match = await bcrypt.compare(password, user.password)
     if(match){
       const refresh_token = createRefreshToken({id: user._id})
       res.cookie('refreshtoken', refresh_token, {
         httpOnly: true,
         path: '/refresh_token',
         maxAge: 7*24*60*60*1000  
       })
       console.log(refresh_token)
       res.send({message: "Login Success", user})
     }else{
       res.send({message: "Login Failed"})
     }
   }else{
     console.log("here")
     const user = new User ({
       name,
       password: passwordHash,
       email
 
 
   })
 
   user.save(err => {
     console.log("Suceess 2")
     console.log(err)
     if(err) {
         return res.send({message : "Login Error"})  
     }
     else {
         return res.send ({ message: "Login Success", user})
        
     }
 })
   }
  }
 else {
  return res.send({message : "Login Error"})
 }
  } catch (err) {
   console.log(err)
  }
 })


app.post("/sendme", async(req,res)=>{
  sendMail2("guryuvraj@gmail.com", 'Your receipt has been generated', "Guryuvraj")
})


app.post("/register", async (req,res) => {
    const {name, email, password, phone, age} = req.body
    const passwordHash = await bcrypt.hash(password, 12)
    console.log(passwordHash)
   User.findOne({email: email}, (err, user) => {
    console.log(user)
    if(user){
        console.log("A Registered");
        res.send({message : "Already Registered"})
    }
    else {
        console.log("Suceess")
        const user = new User ({
            name,
            phone,
            password: passwordHash,
            age,
            email

    
        })

        const activation_token = createActivationToken(user)

        const url = `${CLIENT_URL}/activate/${activation_token}`
        console.log(url)
        try{
          const message = `<!DOCTYPE html>
          <html>
          
          <head>
              <title></title>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <style type="text/css">
                  @media screen {
                      @font-face {
                          font-family: 'Lato';
                          font-style: normal;
                          font-weight: 400;
                          src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                      }
          
                      @font-face {
                          font-family: 'Lato';
                          font-style: normal;
                          font-weight: 700;
                          src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                      }
          
                      @font-face {
                          font-family: 'Lato';
                          font-style: italic;
                          font-weight: 400;
                          src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                      }
          
                      @font-face {
                          font-family: 'Lato';
                          font-style: italic;
                          font-weight: 700;
                          src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                      }
                  }
          
                  /* CLIENT-SPECIFIC STYLES */
                  body,
                  table,
                  td,
                  a {
                      -webkit-text-size-adjust: 100%;
                      -ms-text-size-adjust: 100%;
                  }
          
                  table,
                  td {
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                  }
          
                  img {
                      -ms-interpolation-mode: bicubic;
                  }
          
                  /* RESET STYLES */
                  img {
                      border: 0;
                      height: auto;
                      line-height: 100%;
                      outline: none;
                      text-decoration: none;
                  }
          
                  table {
                      border-collapse: collapse !important;
                  }
          
                  body {
                      height: 100% !important;
                      margin: 0 !important;
                      padding: 0 !important;
                      width: 100% !important;
                  }
          
                  /* iOS BLUE LINKS */
                  a[x-apple-data-detectors] {
                      color: inherit !important;
                      text-decoration: none !important;
                      font-size: inherit !important;
                      font-family: inherit !important;
                      font-weight: inherit !important;
                      line-height: inherit !important;
                  }
          
                  /* MOBILE STYLES */
                  @media screen and (max-width:600px) {
                      h1 {
                          font-size: 32px !important;
                          line-height: 32px !important;
                      }
                  }
          
                  /* ANDROID CENTER FIX */
                  div[style*="margin: 16px 0;"] {
                      margin: 0 !important;
                  }
              </style>
          </head>
          
          <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
              <!-- HIDDEN PREHEADER TEXT -->
              <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
              </div>
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <!-- LOGO -->
                  <tr>
                      <td bgcolor="#00812b" align="center">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                              <tr>
                                  <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
                  <tr>
                      <td bgcolor="#00812b" align="center" style="padding: 0px 10px 0px 10px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                              <tr>
                                  <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                      <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome! ${name}</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
                  <tr>
                      <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                              <tr>
                                  <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                      <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p>
                                  </td>
                              </tr>
                              <tr>
                                  <td bgcolor="#ffffff" align="left">
                                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                          <tr>
                                              <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                  <table border="0" cellspacing="0" cellpadding="0">
                                                      <tr>
                                                          <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href=${url} target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">Confirm Account</a></td>
                                                      </tr>
                                                  </table>
                                              </td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr> <!-- COPY -->
                      
                              <tr>
                                  <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                      <p style="margin: 0;">If you have any questions, just reply to this email&mdash;we're always happy to help out.</p>
                                  </td>
                              </tr>
                              <tr>
                                  <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                      <p style="margin: 0;">Cheers,<br>Luminous Liqour Team</p>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
                  <tr>
                      <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                              <tr>
                                  <td bgcolor="#FFECD1" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                      <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Need more help?</h2>
                                      <p style="margin: 0;"><a href="#" target="_blank" style="color: #FFA73B;">We&rsquo;re here to help you out</a></p>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
                  <tr>
                      <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                              <tr>
                                  <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                      <p style="margin: 0;">If these emails get annoying, please feel free to <a href="#" target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.</p>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
              </table>
          </body>
          
          </html>`
            sendMail(email, url, "Verify", "Subscribe", message)
            console.log("successsssss")
        }catch(err){
            console.log(err)
        }
        
        console.log({activation_token})

        console.log(user)
        console.log("Suceess 1")
        res.send ({ message: "Please activate your email to continue"})
    } 
})

   
})
 
app.post("/activate", (req, res) => {
    try{
      const {activation_token} = req.body
      console.log(activation_token)
      const userVerify = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)
      console.log(userVerify)

      const {name, email, password, phone, age} = userVerify
     
        console.log(userVerify)
            console.log("Suceess")
            const user = new User ({
                name,
                phone,
                password,
                age,
                email
    
        
            })
    
            console.log(user)
            console.log("Suceess 1")
           user.save(err => {
                console.log("Suceess 2")
                console.log(err)
                if(err) {
                    return res.send({message : "Error"})  
                }
                else {
                    return res.send ({ message: "Success"})
                   
                }
            })
        
    } catch(err){
        console.log(err)
     return res.send({message : "Error"})
    
    }
 }) 

 app.post("/refresh_token",  (req,res) =>{
          try{
            console.log('It came')
              const rf_token = req.cookies.refreshtoken
              console.log(rf_token)
              if(!rf_token){
                return res.send({message: "Login now"})
              }

              jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err){
                    return res.send({message: "Login now"})
                }
                const access_token = createAccessToken({id: user.id})
                res.send({access_token})
                console.log(user)
              })
          }catch(err){

          }
 })

 app.post("/forgotPassword",  async (req,res) =>{
  try{
    const {email} = req.body
    const user = await User.findOne({email})
    if (!user){
        return res.send({message: "Not good email"})
    }else{
        const access_token = createAccessToken({id: user._id})
        const url = `${CLIENT_URL}/reset/${access_token}`

        const message = `<!DOCTYPE html>
          <html>
          
          <head>
              <title></title>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <style type="text/css">
                  @media screen {
                      @font-face {
                          font-family: 'Lato';
                          font-style: normal;
                          font-weight: 400;
                          src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                      }
          
                      @font-face {
                          font-family: 'Lato';
                          font-style: normal;
                          font-weight: 700;
                          src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                      }
          
                      @font-face {
                          font-family: 'Lato';
                          font-style: italic;
                          font-weight: 400;
                          src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                      }
          
                      @font-face {
                          font-family: 'Lato';
                          font-style: italic;
                          font-weight: 700;
                          src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                      }
                  }
          
                  /* CLIENT-SPECIFIC STYLES */
                  body,
                  table,
                  td,
                  a {
                      -webkit-text-size-adjust: 100%;
                      -ms-text-size-adjust: 100%;
                  }
          
                  table,
                  td {
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                  }
          
                  img {
                      -ms-interpolation-mode: bicubic;
                  }
          
                  /* RESET STYLES */
                  img {
                      border: 0;
                      height: auto;
                      line-height: 100%;
                      outline: none;
                      text-decoration: none;
                  }
          
                  table {
                      border-collapse: collapse !important;
                  }
          
                  body {
                      height: 100% !important;
                      margin: 0 !important;
                      padding: 0 !important;
                      width: 100% !important;
                  }
          
                  /* iOS BLUE LINKS */
                  a[x-apple-data-detectors] {
                      color: inherit !important;
                      text-decoration: none !important;
                      font-size: inherit !important;
                      font-family: inherit !important;
                      font-weight: inherit !important;
                      line-height: inherit !important;
                  }
          
                  /* MOBILE STYLES */
                  @media screen and (max-width:600px) {
                      h1 {
                          font-size: 32px !important;
                          line-height: 32px !important;
                      }
                  }
          
                  /* ANDROID CENTER FIX */
                  div[style*="margin: 16px 0;"] {
                      margin: 0 !important;
                  }
              </style>
          </head>
          
          <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
              <!-- HIDDEN PREHEADER TEXT -->
              <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
              </div>
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <!-- LOGO -->
                  <tr>
                      <td bgcolor="#00812b" align="center">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                              <tr>
                                  <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
                  <tr>
                      <td bgcolor="#00812b" align="center" style="padding: 0px 10px 0px 10px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                              <tr>
                                  <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                      <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome! ${user.name}</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
                  <tr>
                      <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                              <tr>
                                  <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                      <p style="margin: 0;">Sorry to hear that. To reset your password, please click the button below</p>
                                  </td>
                              </tr>
                              <tr>
                                  <td bgcolor="#ffffff" align="left">
                                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                          <tr>
                                              <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                  <table border="0" cellspacing="0" cellpadding="0">
                                                      <tr>
                                                          <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href=${url} target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">Reset Password</a></td>
                                                      </tr>
                                                  </table>
                                              </td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr> <!-- COPY -->
                      
                              <tr>
                                  <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                      <p style="margin: 0;">If you have any questions, just reply to this email&mdash;we're always happy to help out.</p>
                                  </td>
                              </tr>
                              <tr>
                                  <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                      <p style="margin: 0;">Cheers,<br>Luminous Liqour Team</p>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
                  <tr>
                      <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                              <tr>
                                  <td bgcolor="#FFECD1" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                      <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Need more help?</h2>
                                      <p style="margin: 0;"><a href="#" target="_blank" style="color: #FFA73B;">We&rsquo;re here to help you out</a></p>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
                  <tr>
                      <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                              <tr>
                                  <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                      <p style="margin: 0;">If these emails get annoying, please feel free to <a href="#" target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.</p>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
              </table>
          </body>
          
          </html>`
        sendMail(email, url, "Reset", "Reset Password", message)
        res.send({message: "Check your Mail"})

    }    

  }catch(err){
    console.log(err)
  }
 })

 app.post("/reset", auth,  async (req,res) =>{
  try {
    const {password} = req.body
    console.log(req.body)
    console.log(password)
    const passwordHash = await bcrypt.hash(password, 12)
    console.log(req.user)
    await User.findOneAndUpdate({_id: req.user.id}, {
        password: passwordHash
    })
    res.send({message: "Changed Pass"})
  } catch (err) {
    console.log(err)
  }
 })

 app.get("/logout", async (req,res) =>{
  try {
    sessionStorage.removeItem('myUser')
    res.clearCookie('refreshtoken', {path: '/refresh_token'})
    res.send({message: "Logout"})
  } catch (err) {
    console.log(err)
  }
 })


const createActivationToken = (payload) =>{
    console.log(payload.toJSON())
    return jwt.sign(payload.toJSON(), process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})

}

const createAccessToken = (payload) =>{
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}

const createRefreshToken = (payload) =>{
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

export default id;
//Ivan's Backend
app.route('/currentUser').get( async (req, res) => {

  // Employee.find({}, function(err, val){
  //     res.send(val)
  // })

  const query = Edit.findById({_id: id}).select({'password' : 0, '__v': 0})

  query.exec(function (err, val) {
      if (err) return console.log(err);
      res.send(val);
  })

})

app.use("/edituser", edituser)

app.use("/admin/employee", employee)

app.use("/admin/product", product)

app.use("/api/message", messages)

app.use("/api/convo", convo)

//Manpreet backend
app.post("/test/capstones", (req, res) => {
  const card = req.body;
  capstones.create(card, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log("Test Cap success");
      res.status(201).send(data);
    }
  });
});

app.get("/test/capstones", (req, res) => {
  capstones.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.listen(9005, () => {
    console.log("Started")
})


