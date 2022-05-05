const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();


// middleware 
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dpqbd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const inventoryCollection = client.db('warehouseManagement').collection('inventory');
        console.log('warehouse management database connected');

        // load all data 
        app.get('/product', async (req, res) => {
            const query = {};
            const cursor = inventoryCollection.find(query);
            const inventories = await cursor.toArray();
            res.send(inventories);
        });

        // load single data
        app.get('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const inventory = await inventoryCollection.findOne(query);
            res.send(inventory);
        });

        // add product
        app.post('/product', async(req,res)=>{
            const newProduct=req.body;
            const result=await inventoryCollection.insertOne(newProduct);
            res.send(result);
        })

        

        // delete product
        app.delete('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await inventoryCollection.deleteOne(query);
            res.send(result);

        })
    }

    finally {

    }
}
run().catch(console.dir);


// root API 
app.get('/', (req, res) => {
    res.send('Warehouse Management Server Side');
})

// listening to port 
app.listen(port, () => {
    console.log('Running Port', port);
})