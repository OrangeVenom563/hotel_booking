const express = require('express');
const cors = require('cors');
const app = express();
const mongoConnect = require('./utils/database').mongoConnect
app.use(cors());
app.use(express.json())

app.get('/',(req,res)=>{
    res.json({message:"Hello, welcome to the hotel booking api"})
})

app.use('/room',require('./routes/roomRoutes'));
app.use('/user',require('./routes/userRoutes') );

mongoConnect(()=>{
    app.listen(5000,()=>console.log('Server listerning to 5000'))
})
