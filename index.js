const express = require("express");
const createError = require("http-errors");
const mongoose = require("mongoose");
const app = express();
const registerRoute = require('./routes/registerroute');
const loginRoutes = require('./routes/loginroute');
const imageRoutes = require('./routes/imageroute');
const port = 4000;
app.use(express.json());
const connectdb = require('./db/db')
connectdb();



app.use('/register', registerRoute);

app.use('/login',loginRoutes);

app.use('/image', imageRoutes);

// for just dummy 
// app.use('/' , (req,res)=> {
//     res.send("server created successfully");
// })  don't use that if no url matches it goes with this url other than that we handle errors 


app.use((req,res,next)=> {
    next(createError(404, 'entered url not found'));
});

app.use((err, req, res, next) => {
    console.error('Error occurred:', err);
    res.status(err.status || 500).send({
      error: {
        status: err.status || 500,
        message: err.message,
        // stack: err.stack
      }
    });
});



  // mongoose.connect('mongodb://localhost:27017/entireCrud')
  // .then(() => console.log('Connected! db successfully'))
  // .catch((error)=> console.log('not connected '));

  //entirecrud is a db name 

app.listen(port || 4000 , ()=> {
    console.log("app listen is running successfully");
})

