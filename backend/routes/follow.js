const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Follow = require("../models/Follow");
const { default: mongoose } = require("mongoose");
router.post(
    "/dofollow",
    fetchUser,
    async (req, res) => {
      console.log("REquest to follow to",req.body.page_id ,req.user.id)
      try {  
        if(req.body.page_id && req.user.id) {
          const follow =  new Follow({
            follower: req.user.id,
            page:req.body.page_id
          });
          const savedFollow = await follow.save();
          res.json(savedFollow);
        }
        else throw error("Invalid")
        
      } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
      }
    }
  );

router.delete(
    "/unfollow/",
    fetchUser,
    async (req, res) => {
      try {
           let getfollowdoc = await Follow.findOne({$and:[{page:new mongoose.Types.ObjectId(req.body.page_id)} ,{follower:req.user.id}]});
          if(!getfollowdoc){ return res.status(404).send("Not Found")}
          else{
             await Follow.findByIdAndDelete(getfollowdoc._id).then(
               console.log("Success Follow Doc has been deleted"),
                 res.json({"Success":"Follow Doc has been deleted"})      
             )
          }
      } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
      }
    }
  );
  
  module.exports = router;