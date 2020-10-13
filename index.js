const { response } = require('express');
const express = require('express');
const app = express();
const Datastore = require ('nedb')

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening at port ${port}`));
app.use(express.static('public'));
app.use(express.static('public/emma'));
app.use(express.json());

const database = new Datastore('database.db');
database.loadDatabase();


app.get ('/api', (request, response) => {

    database.find({}).sort({ timestamp: -1 }).exec(function (err, data) {
        // docs is [doc3, doc1]
        if (err) {
            response.end();
            return;
        }
        response.json (data);
    })
      });
   

app.post('/api', (request, response) => {
    console.log('I got a request!');
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
});
