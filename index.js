const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json())

app.get('/',(req,res)=>{
    res.json({message:"Hello, welcome to the hotel booking api"})
})

app.listen(5000,()=>console.log('Server listerning to 5000'))