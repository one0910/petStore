var express = require('express');
var app = express();
var engine = require('ejs-locals');
var admin = require("firebase-admin");
var serviceAccount = require("./fir-test-7b098-firebase-adminsdk-6kx4f-b8d8fcfc77.json");
var bodyParser = require('body-parser');
const cors = require('cors')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fir-test-7b098-default-rtdb.asia-southeast1.firebasedatabase.app"
  });
app.use(express.static('frontend'))

app.use(cors({
  origin:"*",
  methods:['GET','POST','PATCH','DELETE','PUT'],
}))

// app.use(express.static('public'))

// 增加 body 解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

// const whitelist = ["http://localhost:3000","http://localhost:8080","https://pet-sotre.herokuapp.com"]
// const corsOption = {
//     origin:function (origin,callback) {
//         console.log("** Origin of request"+origin);
//         if(whitelist.indexOf(origin) !==-1 || !origin){
//             console.log("Origin accptable");
//         }else{
//             console.log("Origin rejected");
//             callback(new Error("Not allowed by CORS"))
//         }
        
//     }
// }

// app.engine('ejs',engine);
// app.set('views','./views');
// app.set('view engine','ejs');
var fireData = admin.database();

// 後端首頁測試
// app.get("/", (request, response) => {
//   fireData.ref('petData').once("value",(snapshot)=>{
//     response.render('index',{"petData":snapshot.val()})
//   })
// });

//連接petdata API
  app.get('/petlist',function (req,res) {
    // res.header("Access-Control-Allow-Origin","*")
    fireData.ref('petData').once("value",(snapshot)=>{
      res.send(snapshot.val())
    })
  })

  //增加petdata API
  app.post('/petaddData',(request,response)=>{
    var title = request.body.title
    var desc = request.body.desc
    var picturl = request.body.picturl
    // console.log(request.body);
    var contetnRef = fireData.ref('petData').push();
    contetnRef.set({
       "title":title,
       "desc":desc,
       "picturl":picturl,
    }).then(()=>{
       fireData.ref('petData').once('value',(snapshot)=>{
        // res.header("Access-Control-Allow-Origin","*")
          // response.send(snapshot.val())
          response.send({
             "sucess":true,
             "result":snapshot.val(),
             "message":"資料讀取成功"
          })
       })
    })
 })

 var port = process.env.PORT || 8080;
app.listen(port);