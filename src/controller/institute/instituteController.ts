import { Request, Response } from "express";
import generateRandomInsituteNumber from "../../services/generateRandomInstituteNumber";
import { sequelize } from "../../database/connection";




const createInstitute = async (req:Request,res:Response)=>{
        // console.log("Triggered")
        const {instituteName,instituteEmail,institutePhoneNumber,instituteAddress} = req.body 
        const instituteVatNo = req.body.instituteVatNo || null 
        const institutePanNo = req.body.institutePanNo || null
        if(!instituteName || !instituteEmail || !institutePhoneNumber || !instituteAddress){
            res.status(400).json({
                message : "Please provide instituteName,instituteEmail, institutePhoneNumber,  instituteAddress "
            })
            return
        }

        // aayo vane - insitute create garnu paryo --> insitute_123123, course_123132 
        // institute (name)

        const instituteNumber =   generateRandomInsituteNumber()  
       await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${instituteNumber} (
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
            instituteName VARCHAR(255) NOT NULL, 
            instituteEmail VARCHAR(255) NOT NULL UNIQUE, 
            institutePhoneNumber VARCHAR(255) NOT NULL UNIQUE, 
            instituteAddress VARCHAR(255) NOT NULL, 
            institutePanNo VARCHAR(255), 
            instituteVatNo VARCHAR(255), 
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`)

        await sequelize.query(`INSERT INTO institute_${instituteNumber}(instituteName,instituteEmail,institutePhoneNumber,instituteAddress,institutePanNo,instituteVatNo) VALUES(?,?,?,?,?,?)`,{
            replacements : [instituteName,instituteEmail,institutePhoneNumber,instituteAddress,institutePanNo,instituteVatNo]
        })

        await sequelize.query(`CREATE TABLE teacher_${instituteNumber}(
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
            teacherName VARCHAR(255) NOT NULL, 
            teacherEmail VARCHAR(255) NOT NULL UNIQUE, 
            teacherPhoneNumber VARCHAR(255) NOT NULL UNIQUE
            )`)
        
        res.status(200).json({
            message : "Institute created!"
        })
    }


// const createTeacherTable = (req:Request,res:Response)=>{
//     req.user.instituteNumber
   
// }
export default createInstitute