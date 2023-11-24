const express = require("express");
const { json } = require("express");
let api = require("./routes/routes.js");
let multer= require("multer")
let path =require("path")
let coustomerdata = [
  { id: "3", email: "abc@quantomtech.com", product: "vibranium" },
  { id: "6", email: "xyz@quantomtech.com", product: "Cadmium" },
];
const server = express();
server.use(json());
server.use("/api", api);
// firstapi
const jwt = require("jsonwebtoken");
let secKey = "iAmTheBoss";
let tokenarray = [];
// console.log(coustomerdata)
server.get("/gettoken", (req, res) => {
  for (const iterator of coustomerdata) {
    tokenarray.push(jwt.sign(iterator, secKey));
  }
  res.send(tokenarray);
});
// second api
server.post("/getdetailusingtoken", (req, res) => {
  jwt.verify(req.body.token, secKey, (err, dec) => {
    if (err) {
      res.send("sorry try again");
    } else {
      for (const iterator of coustomerdata) {
        if (iterator.id == dec.id) {
          res.send(iterator);
          break;
        }
      }
    }
  });
});
server.post("/adddata", (req, res) => {
  coustomerdata.push(req.body.token);
  res.send(coustomerdata);
});
server.patch("/updatedata", (req, res) => {
  jwt.verify(req.body.token, secKey, (err, dec) => {
    if (err) {
      res.send("sorry try again");
    } else {
      for (const iterator of coustomerdata) {
        if (iterator.id == dec.id) {
          iterator.product = req.body.product;
          res.send(iterator);
          break;
        }
      }
    }
  });
});
server.delete("/delete", (req, res) => {
  jwt.verify(req.body.token, secKey, (err, dec) => {
    if (err) {
      res.send("sorry try again");
    } else {
      for (const iterator of coustomerdata) {
        if (iterator.id == dec.id) {
          coustomerdata.splice(coustomerdata.indexOf(iterator), 1);
          res.send(coustomerdata);
          break;
        } else {
          res.send("no user found with this token ");
        }
      }
    }
  });
});
// imgupload
const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"img")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'-'+file.originalname)
    }
})
const upload=multer({storage:storage})

// server.use(express.urlencoded({extended:true}))
server.post('/upload', (req,res)=>{
    // console.log(req.file)
    res.send("image upload successfully")
}, upload.single('image'))
// const path = require('path');

// Assuming 'server' is your Express app
server.use('/', express.static(path.join(__dirname, 'img')));
const port = 3015;
server.listen(port, console.log(`server is running on ${port}`));
// module.exports = { coustomerdata };
