// userName :user2
// password :fhfrDCcApJ8NFHBf
const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world');
});


const uri = "mongodb+srv://user2:fhfrDCcApJ8NFHBf@cluster0.flc1cng.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
  try {
    await client.connect();
    const userCollection = client.db('foodExpress').collection('user');

    app.get('/user', async(req, res) =>{
      const qurey = {}
      const cursor = userCollection.find(qurey);
      const users = await cursor.toArray();
      res.send(users)
    })

    app.post('/user', async (req, res) => {
      const newUser = req.body;
      console.log('adding new user ', newUser);
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    //delete operation

    app.delete('/user/:id', async(req, res) =>{
      const id = req.params.id;
      const qurey = {_id:ObjectId(id)}
      const result = await userCollection.deleteOne(qurey);
      res.send(result);
    })

  }
  finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log('running port is :', port);
});









// const users = [
//   { id: 1, name: 'rubel', email: 'rm@gmail.com', phone: '01761735894' },
//   { id: 2, name: 'toma', email: 't0@gmail.com', phone: '01761735894' },
//   { id: 3, name: 'bele', email: 'be@gmail.com', phone: '01761735894' },
//   { id: 4, name: 'toma', email: 'tom@gmail.com', phone: '01761735894' },
//   { id: 5, name: 'farzana', email: 'far@gmail.com', phone: '01761735894' },
//   { id: 6, name: 'smita', email: 'sm@gmail.com', phone: '01761735894' },
//   { id: 7, name: 'sadia', email: 'sad@gmail.com', phone: '01761735894' },
// ]

// app.get('/users', (req, res) => {
//   if (req.query.name) {
//     const Search = req.query.name.toLowerCase();
//     const match = users.filter(user => user.name.toLowerCase().includes(Search));
//     res.send(match)
//   }
//   else {
//     res.send(users);
//   }

// });

// app.get('/user/:id', (req, res) => {
//   console.log(req.params);
//   const id = req.params.id;
//   const user = users.find(u => u.id == id);
//   res.send(user);
// });

// app.post('/user', (req, res) => {
//   const user = req.body;
//   user.id = users.length + 1;
//   users.push(user);
//   res.send(user);
// })



