const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();

// dbUser
// QLNFQl1F2yuWRqrC

// middleware 
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dpqbd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log('warehouse management database connected');
async function run() {
    try {
        await client.connect();
        const inventoryCollection = client.db('warehouseManagement').collection('inventory');

        app.get('/product', async (req, res) => {
            const query = {};
            const cursor = inventoryCollection.find(query);
            const inventories = await cursor.toArray();
            res.send(inventories);
        });

        app.get('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const inventory= await inventoryCollection.findOne(query);
            res.send(inventory);
        });
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