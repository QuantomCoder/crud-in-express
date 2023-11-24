const {coustomerdata} = require("../index.js")
const express=require("express")
const route = express.Router();
console.log(coustomerdata)
const jwt= require("jsonwebtoken")
let secKey="iAmTheBoss";
let tokenarray=[]
// console.log(coustomerdata)
route.get("/gettoken",(req,res)=>{
for (const iterator of coustomerdata) {
    tokenarray.push(jwt.sign(iterator,secKey))
}
res.send(tokenarray)
})
module.exports=route;


