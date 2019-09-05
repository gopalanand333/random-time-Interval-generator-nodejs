const express = require("express");
const app = express();
const port = process.env.Port || 3000;
/**
 * Cors is used to avoid cross oprigin calls by adding allod Cross origing header in the request and response.  
 */
const cors = require("cors");
app.use(cors());
//get call
app.get("/",(req,res)=>{
    res.send("the server us jumping");
});


//listening to a port
app.listen(port, ()=>{
    console.log("App is running at -", port);
});