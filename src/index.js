const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const moment=require("moment")
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    const timestamp = moment().format("YYYY-MM-DD  h:mm:ss ,");
    const ip = " 192.168.190.84 " ;
    console.log(timestamp , ip , req.url)
    next();
})


mongoose.connect("mongodb+srv://rukmani-ahirwar_47:MwZwUI2CCbousHGE@cluster0.r6pdzdr.mongodb.net/Rukmani_420?retryWrites=true&w=majority", {

    useNewUrlParser: true
})

.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use (
    function (req, res, next) {
        console.log ("inside GLOBAL MW");
        next();
  }
  );

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
