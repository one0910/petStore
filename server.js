var express = require('express');
var app = express();
var admin = require("firebase-admin");
var serviceAccount = require("./fir-test-7b098-firebase-adminsdk-6kx4f-b8d8fcfc77.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fir-test-7b098-default-rtdb.asia-southeast1.firebasedatabase.app"
  });
app.use(express.static('frontend'))


  var fireData = admin.database();
  //連接資料庫，寫了一支API來接friebase裡的pet data
  app.get('/petlist',function (req,res) {
    fireData.ref('petData').once("value",(snapshot)=>{
       // var data = snapshot.val()
       res.send(snapshot.val())
    })
 })

 var port = process.env.PORT || 8080;
app.listen(port);