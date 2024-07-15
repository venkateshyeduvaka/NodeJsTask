const UserModel=require("../Models/UserModel")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userRegister=async(req,res)=>{
    try {
        const {username, email, password, role}=req.body

        const user = await UserModel.findOne({email})

        if(user){
            throw new Error("User Already Exists")
        }

        if (!email) {
            throw new Error("Please provide email");
        } else if (!password) {
            throw new Error("Please provide password");
        } else if (!username) {
            throw new Error("Please provide name");
        }
        else if (!role) {
            throw new Error("Please provide name");
        }


        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);
    
        if (!hashedPassword) {
          throw new Error("Something is wrong");
        }

        const NewUser = {
            ...req.body,
            password: hashedPassword,
          };
      
          const userData = new UserModel(NewUser);
          const saveUser = await userData.save();
      
          res.status(201).json({
            data: saveUser,
            message: "User created successfully",
            success: true,
            error: false,
          });

        
    } catch (error) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
          });
    }
}

const userLogIn=async(req,res)=>{
    try {
        const { email, password } = req.body;
    
        if (!email) {
          throw Error("Please provide email address");
        } else if (!password) {
          throw Error("Please provide password");
        }
    
        const user = await UserModel.findOne({ email });
        //console.log("check--1",user)
        if (user) {
          const isPasswordCorrect = await bcrypt.compareSync(
            password,
            user.password
          );
          //console.log(isPasswordCorrect)
          if (isPasswordCorrect) {
            //console.log("check")
            const token = jwt.sign({ email,role:user.role}, "MERN",{ expiresIn: "1h" });
           // jwt.sign({ username: user.username, id: user._id },"MERN",{ expiresIn: "1h" });
           // console.log("token",token)
            res.json({
              message: "User login suceesfully",
              data: { id: user._id, token },
              success: true,
              error: false,
            });
          } else {
            res.json({
              message: "Password is incorrect",
              success: false,
              error: true,
            });
          }
        } else {
          throw Error("User does not exists");
        }
      } catch (err) {
        //console.log("checked")
        res.json({
          message: err.message || err,
          success: false,
          error: true,
        });
      }
}


module.exports={userRegister,userLogIn}