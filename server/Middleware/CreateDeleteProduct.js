const jwt = require('jsonwebtoken');


const CreateandDeleteMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(400).send('Token not provided');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    if(req.user.role==="admin"){
        next();
    }
    else{
        return res.status(403).send('Access Denied');
    }
  } catch (err) {
    res.status(401).send('Invalid Token');
  }
};

module.exports=CreateandDeleteMiddleware
