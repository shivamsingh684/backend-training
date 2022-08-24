const express = require('express');
const moment=require('moment')
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://shivamsinghh_684:hFY7Ym3BsbQi0JuT@cluster0.broqahz.mongodb.net/shivamsingh-mongos3", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use (
    function (req, res, next) {
      let date=moment().format('DD-MM-YYYY  HH:mm:ss')
      let ip=req.ip
      let url=req.originalUrl
      console.log(date +"  "+ip+"  "+url)
      next();
    
  }
  );

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
