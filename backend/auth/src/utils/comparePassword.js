import bcrypt from "bcryptjs"; 

const comparePassword = (password , hashPwd) => {
    return bcrypt.compare(password, hashPwd); 
}

export default comparePassword;