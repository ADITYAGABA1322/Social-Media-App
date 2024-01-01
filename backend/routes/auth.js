const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "VanshSecret";
const { body, validationResult } = require("express-validator");
const fetchUser=require('../middleware/fetchUser')

//ROUTE1:For Creating the user
router.post(
  "/createuser",
  [
    body("name", "Enter a Valid Name").isLength({ min: 3 }),
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
      let user = await User.findOne({ email: req.body.email });
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
      let user = await User.findOne({ email });
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
            res.json({success, authtoken });
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

module.exports = router;
