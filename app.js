const express = require('express')
const app=express()
const PORT =  process.env.PORT || 5000
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
  app.use(express.json())
  app.use(require('./routes/routes'))


app.listen(PORT,()=>{
    console.log("Server Running")
})
