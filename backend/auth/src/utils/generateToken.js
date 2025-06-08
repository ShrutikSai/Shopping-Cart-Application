import jwt from 'jsonwebtoken'; 
import jwtSecret from '../config/index.js'
import dotenv from 'dotenv';
dotenv.config();


const generateToken = (user) => {
    const token = jwt.sign(
        {
        _id : user._id ,
          email : user.email,
           role : user.role, 
        }, 
        process.env.JWT_SECRET,
 
        {expiresIn:"7d"}
    )
        return token ; 
}



export default generateToken ;