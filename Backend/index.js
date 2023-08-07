const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");

const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { noteRouter } = require("./routes/note.routes");
require("dotenv").config()
const port = process.env.PORT
const app = express();
if(process.env.NODE_ENV==="development"){
    app.use(cors({
      exposedHeaders: ['Cookie',"Authorization"],
      credentials:true,
      origin: 'http://127.0.0.1:3000'
    }));
  
  }

app.use(express.json())
app.use(cookieParser());
app.use("/user",userRouter)
app.use("/note",noteRouter)

app.get("/",(req,res)=>{
    res.send(
        {
            message:"api is working now"
        }
    )
})


app.listen(port,async()=>{
try {
    await connection
    console.log("database is connected")
} catch (error) {
    console.log(error)
}

    console.log("Server is running on port number",port)

})