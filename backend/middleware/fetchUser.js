const jwt = require("jsonwebtoken");
const JWT_SECRET = "VanshSecret";
const fetchUser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({errror:"Please authenticate using a valid token"})
    }
   else{
    try{
        const string=jwt.verify(token,JWT_SECRET)
        req.user=string.user;
        next();
    }
    catch(error){
        res.status(401).send({errror:"Please authenticate using a valid token"})
    }
   }
}
module.exports=fetchUser