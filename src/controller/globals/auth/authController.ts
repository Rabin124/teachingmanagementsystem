import { Request, Response } from 'express';
import User from '../../../database/models/user.model';
import bcrypt from 'bcrypt'; // Assuming you are using bcrypt for password hashing
import jwt from 'jsonwebtoken'; // Assuming you are using JWT for authentication
/*
LOGIN/ SIGNIN
REGISTER/SIGNUP
incoming data --> email, password, name, phone, etc.
processing/checking --> mail valid, compulsory data assume paryo
db query --> table insert/read/update/delete
LOGOUT
FORGET PASSWORD
RESET PASSWORD/ OTP
 */

// const registerUser = async(req: Request, res: Response) => {
// // const username = req.body.username;
// // const password = req.body.password;
// // const email = req.body.email;

// const [username, password, email] = req.body;
// if (!username || !password || !email) {
//      res.status(400).json({ message: 'Username, password, and email are required.' });
//   }else{
//     //insert into Users table
//      await User.create({
//         username: username,
//         password: password,
//         email: email
//       })
//      res.status(200).json({ message: 'User registered successfully.' });
//   }
// }
class AuthController{
   static async registerUser(req:Request,res:Response){
      console.log(req.body);
      
      if(req.body == undefined){
         console.log("triggered");
         res.status(400).json({
            message : "No data was sent!!"
         })
         return
      }
   const {username,password,email} = req.body
    if(!username || !password || !email){
      res.status(400).json({
         message : "Please provide username, password, email"
     })
     return
    }
     // insert into Users table 
     await User.create({
         username :username, 
         password : bcrypt.hashSync(password, 12), // Hashing the password
         email : email
     })
     res.status(200).json({
         message : "User registered successfully"
     })
   }

   async loginUser(req:Request,res:Response){
      const {email, password} = req.body;
      if (!email || !password) {
         res.status(400).json({
            message: "Please provide email and password"
         });
         return;
      }
      // CHECK IF EMAIL EXIST OR NOT IN OUR USERS TABLE
      const data = await User.findAll({
         where:{
            email
         }
      });
      if (data.length === 0) {
         res.status(404).json({
            message: "Not registered yet, please register first"
         });
      }else{
      // Compare the password with the hashed password in the database
      const isPasswordMatch = bcrypt.compareSync(password,data[0].password)
      if (!isPasswordMatch) {
         const token = jwt.sign({id :data[0].id},"thisisasecretkey",{
            expiresIn: '1h' // Token expiration time
         });
         res.json({
            token: token,
         })
      }
      // If email and password are valid, return success response
      res.status(200).json({
         message: "Login successful",
         user: {
            id: data[0].id,
            email: data[0].email
         }
      });
   }
}
}
export default AuthController
