const express=require("express")
const bodyParser=require("body-parser")
const app=express()
const userRouter=require("./Routes/userRouter")

app.use(bodyParser.json())
app.use("/user",userRouter)

const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("Server is running on port "+PORT);
})