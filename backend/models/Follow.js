const mongoose = require("mongoose");
const followSchema = new mongoose.Schema(
    {
        // added by the follower
        follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        },
        // added to the page owner
        page: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        },
    },
    { timestamps: true }
    );
    module.exports=mongoose.model("follows", followSchema);