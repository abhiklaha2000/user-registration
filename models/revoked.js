const mongoose = require("mongoose");

const revokedSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true
    }
});

const revoked = new mongoose.model("Revoked", revokedSchema);

module.exports = revoked;