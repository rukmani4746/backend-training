const express = require('express');
const bodyParser = require('body-Parser');
const mongoose= require('mongoose');
const app = express();
const route = require('../routes/route.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://rukmaniCluster:LGsQm76BRZ2K5xIx@rukmaniscluster.u2yauxo.mongodb.net/group51Database?retryWrites=true&w=majority",{
    
        useNewUrlParser: true
})
.then ( () => console.log("MongoDb is connected"))
.catch( error => console.log(error))

app.use('/',route);
app.listen(process.env.PORT||3000,function(){
    console.log('express app running on this port'+(process.env.PORT||3000))
});

