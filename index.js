const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const Product = require("./models/product")
const routerProducts = require('./routes/productRoute')

require("dotenv").config();
const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// connect to mongodb 

const dbUri = process.env.dbUri
mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        app.listen(port, () => {
            console.log(`Now listening on port ${port}`);
        });
    })
    .catch(err => console.log(`error: ${err}`))

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});



app.get("/products", (req, res) => {

    Product.find().then(result => {
        res.send(result)
    }).catch(err => {
        console.log(err)
    })

});


app.use('/api/', routerProducts)









