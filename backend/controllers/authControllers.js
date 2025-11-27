import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try{
        const { username, email, password } = req.body;
        //check existing user
        const existingUser = await User.findOne({email});
        if(existingUser)
            return res.status(400).json({message: "User already exists"});

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //save user
        const newUser = new User({username, email, password: hashedPassword});
        await newUser.save();

        res.status(201).json({message: "User registered successfully"});
    }catch(err){
        console.error("Register error : ", err);
        res.status(500).json({message : "Server error"});
    }
}

export const login = async (req, res) => {
    try{
        const { email, password} = req.body;

        //find user
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "Invalid credential"});

        const ismatch = await bcrypt.compare(password, user.password);
        if(!ismatch) return res.status(400).json({message : "Invalid credential"});

        const token = jwt.sign(
      { userId: user._id },          // 🔥 FIXED
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });


        res.json({
            message: "Login successful",
            token,
             user: { id: user._id, username: user.username, email: user.email }
        });

    }catch(err){
        console.log("Login error : ", err);
        res.status(500).json({message: "Server error"});
    }
}