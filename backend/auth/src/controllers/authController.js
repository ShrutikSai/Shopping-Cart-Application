import AuthService from '../services/authService.js';

class AuthController {
    constructor() {
        this.AuthService = new AuthService();
    }

    async signIn(req, res, next) {

        try {
            const credentials = req.body
            const result = await this.AuthService.signIn(credentials)

            if (result.success) {
                res.json({ token: result.token });
            } else {
                res.status(400).json({ message: result.message });
            }
        } catch (err) {
            next(err)
        }
    }

    async signUp(req, res, next) {
        try {
            const credentials = req.body
            const result = await this.AuthService.signUp(credentials)

            if (result.success) {
                return res.status(201).json({
                    success: true,
                    message: result.message || 'User created successfully'
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: result.message || 'Failed to create user'
                });
            }


        } catch (err) {
            next(err)
        }
    }

    async verifyEmail(req, res, next) {
        try {
            const { email } = req.body;
            const result = await this.AuthService.verifyEmail(email);

            if (result.success) {
                return res.status(201).json({
                    success: true,
                    message: result.message
                });
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: result.message
                });
            }

        } catch (err) {
            next(err)
        }
    }

    async verifyUser(req, res, next) {
        try {
            const { email, code } = req.body;
            const result = await this.AuthService.verifyUser(email, code);

            if (result.success) {
                return res.status(201).json({
                    success: true,
                    message: result.message
                });
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: result.message
                });
            }

        } catch (err) {
            next(err)
        }
    }

    async resetPassword(req, res, next) {
        try {
            const { email, newPassword } = req.body;

            const result = await this.AuthService.resetPassword(email, newPassword);
            if (!result.success) {
                return res.status(400).json({
                    success: false,
                    message: result.message
                });
            }

            return res.status(200).json({
                success: true,
                message: result.message
            });

        } catch (err) {
            next(err);
        }

    }

    async changePassword(req, res, next) {
        try {
            const { oldPassword, newPassword } = req.body;
            const { _id } = req.user

            const result = await this.AuthService.changePassword(_id, oldPassword, newPassword);
            if (!result.success) {
                return res.status(400).json({
                    success: false,
                    message: result.message
                });
            }

            return res.status(200).json({
                success: true,
                message: result.message
            });

        } catch (err) {
            next(err);
        }

    }

    async sendForgotPassword(req, res, next) {
        try {
            const {email} = req.body ; 
            const result = await this.AuthService.sendForgotPassword(email);
            if (!result.success) {
                return res.status(400).json({
                    success: false,
                    message: result.message
                });
            }

            return res.status(200).json({
                success: true,
                message: result.message
            }); 

        } catch(err) {
            next(err)
        }
    }

    async verifyResetPassword(req, res, next) {
        try {
            const {email , code} = req.body ;

            const result = await this.AuthService.verifyResetCode(email , code) ; 

            if (!result.success) {
                return res.status(400).json({
                    success: false,
                    message: result.message
                });
            }
            return res.status(200).json({
                success: true,
                message: result.message
            });

        } catch(err) {
            next(err)
        }
    }



    async sendLoginOTP(req, res, next) {
        try {
            const { email } = req.body;

            const result = await this.AuthService.sendLoginOTP(email);
            if (!result.success) {
                return res.status(400).json({
                    success: false,
                    message: result.message
                });
            }

            return res.status(200).json({
                success: true,
                message: result.message
            });

        } catch (err) {
            next(err);
        }

    }

    async loginOTP(req, res, next) {
        try {
            const { email, code } = req.body;

            const result = await this.AuthService.loginOTP(email, code);
            if (!result.success) {
                return res.status(400).json({
                    success: false,
                    message: result.message
                });
            }

            return res.status(200).json({
                success: true,
                message: result.message,
                token: result.token
            });

        } catch (err) {
            next(err);
        }
    }



    async getUserProfile(req, res, next) {
        try {
            const { _id } = req.user;
            console.log(_id)

            const result = await this.AuthService.getUserProfile(_id);

            if (!result.success) {
                return res.status(404).json({
                    success: false,
                    message: result.message
                });
            }

            return res.status(200).json({
                success: true,
                message: result.user
            });
        } catch (err) {
            next(err)
        }
    }

    async updateUserProfile(req, res, next) {
        try {
            const { _id } = req.user;
            const user = req.body;

            const result = await this.AuthService.updateUser(_id, user);

            if (!result.success) {
                return res.status(400).json({
                    success: false,
                    message: result.message
                });
            }

            return res.status(200).json({
                success: true,
                message: result.message
            });
        } catch (err) {
            next(err)
        }
    }

    async addAddress(req, res, next) {
        try {
            const { _id } = req.user;
            const address = req.body;

            const result = await this.AuthService.addUserAddress(_id, address);

            if (!result){
                return res.status(400).json({
                    success: false,
                    message: result.message
                });
            }

            return res.status(200).json({
                success: true,
                message: result.message
            });


        } catch (err) {
            next(err)
        }
    }


    async deleteAddress(req, res, next) {
        try {
            const { _id } = req.user;
            const addressId = req.params.addressId;

            const result = await this.AuthService.removeUserAddress(_id, addressId);

            if (!result){
                return res.status(400).json({
                    success: false,
                    message: result.message
                });
            }
            return res.status(200).json({
                success: true,
                message: result.message
            })

        } catch(err) {
            next(err)
        }
    }

    async updateAddress(req, res, next) {
        try {
            const { _id } = req.user;
            const addressId = req.params.addressId ; 
            const address = req.body;

            const result = await this.AuthService.updateUserAddress(_id, addressId, address);

            if (!result){
                return res.status(400).json({
                    success: false,
                    message: result.message
                });
            }
            return res.status(200).json({
                success: true,
                message: result.message
            })

        } catch(err) {
            next(err)
        }
    }

    async getUserAddresses (req, res, next) {
        try {
            const { _id } = req.user;

            const result = await this.AuthService.getUserAddresses(_id);

            if (!result){
                return res.status(400).json({
                    success: false,
                    message: result.message
                });
            }
            return res.status(200).json({
                success: true,
                message: result.addresses
            })
        } catch(err) {
            next(err)
        }
    }

    async getUserAddress (req, res, next) {
        try {
            const { _id } = req.user;
            const id = req.params.id;
            const addressId = req.params.addressId;

            const result = await this.AuthService.getUserAddress(_id, addressId);

            if (!result){
                return res.status(400).json({
                    success: false,
                    message: result.message
                });
            }
            return res.status(200).json({
                success: true,
                message: result.address
            })
        } catch(err) {
            next(err)
        }
    }




}

export default AuthController;