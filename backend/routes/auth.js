const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "VanshSecret";
const { body, validationResult } = require("express-validator");
const fetchUser=require('../middleware/fetchUser');
const { default: mongoose } = require("mongoose");

//ROUTE1:For Creating the user
router.post(
  "/createuser",
  [
    body("name", "Enter a Valid username").isLength({ min: 3 }),
    body("email", "Enter a Valid Mail").isEmail(),
    body("password", "Enter a strong Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //If there are errors ,return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //Check if user already exist?
      let user = await User.findOne({$or: [{ email: req.body.email },{name:req.body.name}]});
      if (user)
        res
          .status(400)
          .json({ error: "Sorry a user with email already exists" });
      //If no errros then create the user in db
      else {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
          name: req.body.name,
          // avatar:req.body.base64,
          password: secPass,
          email: req.body.email,
        });
        const data = {
          user: {
            id: user.id,
          },
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  }
);
//ROUTE-2 FOR LOGIN THE USER
router.post(
  "/login",
  [
    body("email", "Enter a Valid Mail").isEmail(),
    body("password", " Password  can't be blank").exists(),
  ],
  async (req, res) => {
    let success=false;
    //If there are errors ,return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success,  errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      //Check if user already exist?
      let user = await User.findOne({ $or: [{ name:email }, { email }] });
      if (!user) res.status(400).json({success,  error: "Invalid Info" });
      //If  user exists then validate the password
     else{
        const PasswordCompare = await bcrypt.compare(password, user.password);
        //if password not valid
        if (!PasswordCompare) res.status(400).json({success,  error: "Invalid Info" });
        else {
          const data = {
              user: {
                id: user.id,
              },
            };
            const authtoken = jwt.sign(data, JWT_SECRET);
            success=true
            let username=user.name
            res.json({success, authtoken,username });
        }
     }
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  }
);

//ROUTE-3 FOR GETTING THE INFO OF LOGGEDIN THE USER
router.post('/getuser',fetchUser,async(req,res)=>{
  try {
    const userId=req.user.id;
    const user=await User.findById(userId).select('-password')
    res.send(user)
  } catch (error) {
    console.log(err);
      res.status(500).send('Internal Server Error');
  }

})
//ROUTE-4 Search User
router.get('/user/:name',fetchUser,async(req,res)=>{
  try {
    const { name } = req.params;
    // console.log("YUSER",req.user.id)
    const page=await User.aggregate([
       { $match:{
          name:name,
        }
      },
       {
        $lookup:{
          from:'posts',
          localField:'_id',
          foreignField:'user',
          as:'allpost'
        },
        
       },
       {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "page",
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "follower",
          as: "following",
        },
      },
      {
        $addFields: {
          followersCount: {
            $size: "$followers"
          },
          followingToCount: {
            $size: "$following"
          },
          // tells logeedin user whether subscribed or not the  channel  of other user open on his/her screen.
          isFollowing: {
            $cond: {
              if: { $in: [new mongoose.Types.ObjectId(req.user?.id), "$followers.follower"] },
              then: true,
              else: false,
            },
          },
         
          isOwner: {
            $cond: {
            
              if: { $in: [new mongoose.Types.ObjectId(req.user?.id), "$allpost.user"] },
              then: true,
              else: false,
            },
          },
          
        }
      },   
       {
        $project: {
          name: 1,
          avatar:1,
          followersCount:1,
          followingToCount:1,
          isFollowing:1,
          isOwner:1,
          followers:1,
          allpost:1,
        },
      },
    ])
  //  console.log(page[0].followers)
    return res
    .status(200)
    .json(
     page?.length>0?page[0]:""
    )
  } catch (error) {
    console.log(error);
      // res.status(500).send('Internal Server Error');
  }

})

router.put('/avatar',fetchUser,async(req,res)=>{
   try {

    const { avatar } = req.body; 
    const  getuser = await User.findByIdAndUpdate(req.user.id,{$set:{avatar}},{new:true});
        res.json(getuser);
    
} catch (error) {
  console.log(error);
  res.status(500).send("Internal Server Error");
}
})
module.exports = router;
