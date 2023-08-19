import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/index.js";

(async()=>{
try{
await mongoose.connect(config.MONGODB_URL);
console.log("DB connected")
app.on('error',(err)=>{
    console.error("error",err);
    throw err;
})
 const onListening=()=>{
    console.log("Listening on port 5000");
 }
 app.listen(config.PORT,onListening);
}
catch(err){
    console.log("error",err);
    throw err;
}

})()