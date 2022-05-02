const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

// dbUser
// QLNFQl1F2yuWRqrC

// middleware 
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dpqbd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log('warehouse management database connected');
  // perform actions on the collection object
  client.close();
});


// root API 
app.get ('/',(req,res)=>{
    res.send('Warehouse Management Server Side');
})

// listening to port 
app.listen(port,()=>{
    console.log('Running Port',port);
})