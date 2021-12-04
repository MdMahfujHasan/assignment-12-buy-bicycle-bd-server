const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient } = require('mongodb');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://buy-bicycle-bd:OZmPcDsxCZk9TxPHI@cluster0.4kpep.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});

async function run() {
    try {
        await client.connect();
        const database = client.db('buy-bicycle-bd');
        const orderNowCollection = database.collection('orderNow');

        app.post('/orderNow', async (req, res) => {
            const orderNow = req.body;
            const result = await orderNowCollection.insertOne(orderNow);
            res.json(result);
        })
    }
    finally {

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`listening at ${port}`)
})