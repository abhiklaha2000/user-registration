const express = require('express');
require('./db/conn');
const app = express();
const port = process.env.Port || 4000;
const userRouter =  require("./routes/user");


app.use(express.json());

// for User Routes
app.use('/',userRouter);


app.listen(port,() =>{
    console.log(`listening on ${port}`);
})