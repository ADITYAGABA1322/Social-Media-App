const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const Post = require("../models/Posts");
//ROUTE1: GET ALL THE postS

router.get("/fetchallposts", fetchUser, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id });
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
//ROUTE2: ADD THE Post
router.post(
  "/addpost",
  fetchUser,
  [
    body("title", "Enter a Valid Title").isLength({ min: 3 }),
    body("description", "Enter a Valid Description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        const { title, description, base64, reaction, } =
        req.body;
        console.log("body",req.body)
        const post = new Post({
          title,
          description,
          image:base64,
          reaction,
          user: req.user.id,
        });
        const savedpost = await post.save();
        res.json(savedpost);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
);
//ROUTE3: Update THE post
router.put(
  "/updatepost/:id",
  fetchUser,
  async (req, res) => {
    try {

        const { title, description, reaction } = req.body;
        const updatedpost={}
        if(title){updatedpost.title=title};
        if(description){updatedpost.description=description};
        if(reaction){updatedpost.reaction=reaction}
         let getpost = await Post.findById(req.params.id);
        if(!getpost){ return res.status(404).send("Not Found")}
        if(getpost.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed");
        }
        else{
            getpost = await Post.findByIdAndUpdate(req.params.id,{$set:updatedpost},{new:true});
            res.json(getpost);
        }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
);
//ROUTE4: DELETE THE post
router.delete(
  "/deletepost/:id",
  fetchUser,
  async (req, res) => {
    try {

        const { title, description, reaction } = req.body;
         let getpost = await Post.findById(req.params.id);
        if(!getpost){ return res.status(404).send("Not Found")}
        if(getpost.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed");
        }
        else{
            getpost = await Post.findByIdAndDelete(req.params.id);
            res.json({"Success":"post has been deleted"})        }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
