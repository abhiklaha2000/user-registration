const express = require('express');
require('./db/conn');
const app = express();
const port = process.env.Port || 4000;
const userRouter =  require("./routes/user");
// const adminRouter =  require("./routes/admin");
// require('dotenv').config();

// app.set('view engine','ejs');
// app.set('views','./views/users');

app.use(express.json());

// for User Routes
app.use('/',userRouter);

// // for Adim Routes
// app.use(adminRouter);

app.listen(port,() =>{
    console.log(`listening on ${port}`);
})