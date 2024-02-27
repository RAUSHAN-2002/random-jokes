const express = require("express")
const path = require("path")
const app = express()
const hbs = require("hbs")
const Collection = require("./mongo")


const tempelatePath = path.join(__dirname, '../tempelates')

app.use(express.json())
app.set("view engine","hbs")
app.set("views",tempelatePath)
app.use(express.urlencoded({extended:false}))


app.get("/",(req,res)=>{
    res.render("login")
})
app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.post("/signup",async(req,res)=>{
    const data ={
        name:req.body.name,
        password:req.body.password
    }
    await Collection.insertMany([data])
    res.render("home")
})

app.post("/login",async(req,res)=>{
    try{
        const check=await Collection.findOne({name:req.body.name})

        if(check.password===req.body.password){
            res.render("home")
        }
        else{
            res.send("wrong password")
        }
    }
    catch{
        res.send("wrong details")
    }

})  





app.listen(3001,()=>{
    console.log("server working");
})