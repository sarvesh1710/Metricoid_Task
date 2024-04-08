// userRouter.js
const { Router } = require("express");
const { User } = require("../db/db");
const router = Router();
const userMiddleware = require("../middlewares/userMiddleware");
const jwt=require("jsonwebtoken")
const secretkey="sarvesh1710"



router.post("/Create", async (req, res) => {
    try {
        const data = req.body;
        await generateToken(data.username)
        
        await User.create({
            username: data.username,
            email: data.email,
            password: data.password,
            createdAt: data.createdAt,
            updatedAt:data.updatedAt
        });
        res.json({
            message: "New User Created Successfully",
        });
    } catch (error) {
        res.status(500).json({ error: "Error in Saving the user to Database" });
    }
});

router.get("/Show", async (req, res) => {
    try {
        const users = await User.find({});
        res.json({
            message: "Users are listed here",
            users: users
        });
    } catch (error) {
        res.status(400).send("Bad request");
    }
});

router.put("/updateuser/:id", userMiddleware, async (req, res) => {
    const id = req.params.id;
    const { username, password } = req.body;
    const updatedAt = new Date();

    try {
        await User.updateOne({ _id: id }, { $set: { username, password, updatedAt } });
        res.json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to update user" });
    }
});

router.delete("/remove/:id",userMiddleware,async(req,res)=>{
    const id=req.params.id;
    try{
        let removeuser=await User.findByIdAndDelete(id)
        if(!removeuser){
            res.json({message:"No user found with provided ID"})
            return;
        }
        else{
            res.json({
                message: 'User removed'+' '+removeuser.username
            })
        }
    }
    catch(err){
        res.json({
            message: err
        })
    }
})

module.exports = router;
