import express from "express";

const app=express();

app.get("/", (req, res)=>res.send("Hello World!!!!!!"));

const PORT=8098;

app.listen(PORT, ()=>{
    console.log(`the server is litsening on port : ${PORT}`);
});