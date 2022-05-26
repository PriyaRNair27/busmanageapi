const Express=require("express")
const Bodyparser=require("body-parser")
const Mongoose=require("mongoose")
var app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())
app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS" ); 
    next(); });
var busmodel=Mongoose.model("buses",
new Mongoose.Schema({
    route:String,
    busname:String,
    busregno:String,
    owner:String,
    contact:String

}))
Mongoose.connect("mongodb+srv://mzcbook:807826@cluster0.2sbk9.mongodb.net/busDb")

app.post("/api/busmanage",(req,res)=>
{
    var getroute=req.body.route
    var getbusname=req.body.busname
    var getbusregno=req.body.busregno
    var getowner=req.body.owner
    var getcontact=req.body.contact
    data={"route":getroute,"busname":getbusname,"busregno":getbusregno,"owner":getowner,"contact":getcontact}
 let mybus=new busmodel(data)
 mybus.save((error,data)=>{
     if(error)
     {
         res.send({"status":"error","data":error})
     }
     else
     {
         res.send({"status":"success","data":data})
     }

 })
})
app.get("/api/bus",(req,res)=>{
    busmodel.find(
        (error,data)=>{
            if(error)
     {
         res.send({"status":"error","data":error})
     }
     else
     {
         res.send({"status":"success","data":data})
     }

            
        }
    )
})
app.listen(4000,()=>{
    console.log("server running")
})