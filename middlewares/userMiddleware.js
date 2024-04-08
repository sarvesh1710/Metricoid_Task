// userMiddleware.js
const { User } = require("../db/db");

async function userMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;
    const token=req.headers.token

    try {
        if(varifyToken(token)==username){
            const user = await User.findOne({ username, password });
            if (user) {
                next();
            } else {
                res.status(403).json({ message: "User does not exist" });
            }
        }
        else{
            res.status(501).send('Not implemented')
        }
        
    } catch (error) {
        res.status(500).json({ error: "Error checking user existence" });
    }
}



module.exports = userMiddleware;
