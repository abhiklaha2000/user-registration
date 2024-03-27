const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/user-registration").then(() => {
    console.log('Connected to Mongodb!!!');
}
).catch((err) =>{
    console.log(err);
})
