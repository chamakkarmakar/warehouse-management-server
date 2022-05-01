const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();

// middleware 
app.use(cors());
app.use(express.json());

// root API 
app.get ('/',(req,res)=>{
    res.send('Warehouse Management Server Side');
})

// listening to port 
app.listen(port,()=>{
    console.log(port);
})