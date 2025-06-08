import bcrypt from 'bcryptjs'; 

const hashPwd = (password) => {
    return new Promise ((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                return reject(err);
            }
            else {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        return reject(err) ; 
                    }

                    resolve(hash);
                });
            }
        })
    })
}

export default hashPwd;