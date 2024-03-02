const User = require('../models').User;
const bcrypt = require('bcryptjs');
const { maxExpire, createToken } = require('../utils/createToken');
const { hashPassword } = require('../utils/hashPassword');
const { otp } = require('../utils/otpGenerator');

module.exports = {
    async register(req, res) {
        try {
            const { username, email, password, no_telp } = req.body;

            if (!email) {
                return res.status(400).send({ message: 'Email is required' });
            }

            if (email) {
                const user = await User.findOne({ where: { email: email } });
                if (user) {
                    return res.status(400).send({ message: 'Email already exists' });
                }
            } else if (no_telp) {
                const user = await User.findOne({ where: { no_telp: no_telp } });
                if (user) {
                    return res.status(400).send({ message: 'Phone number already exists' });
                }
            }

            const hashedPassword = await hashPassword(password);

            const newUser = await User.create({
                username: username,
                email: email,
                password: hashedPassword,
                no_telp: no_telp,
                otp_enabled: false
            });

            return res.status(201).json({
                message: 'User registered successfully',
                status: true,
                data: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                    no_telp: newUser.no_telp,
                }
            });
        } catch (error) {
            console.error("Error in registering user:", error);
            return res.status(500).send("Internal Server Error");
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email: email } });

            if (!user) {
                return res.status(401).send({ message: 'Invalid credentials' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                const token = await createToken(user);
                res.cookie('token', token, { httpOnly: true, secure: true, maxAge: maxExpire * 1000 });
                return res.status(200).send({
                    message: 'Logged in',
                    status: true,
                    data: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        no_telp: user.no_telp,
                        token: token
                    }
                });
            } else {
                return res.status(401).send({ message: 'Invalid credentials' });
            }
        } catch (error) {
            console.error("Error in user login:", error);
            return res.status(500).send("Internal Server Error");
        }
    },

    async generateOtp(req, res) {
        try {
            const { email, no_telp } = req.body;

            let user;

            if (email) {
                user = await User.findOne({ where: { email: email } });
            } else if (no_telp) {
                user = await User.findOne({ where: { no_telp: no_telp } });
            }

            if (!user) {
                return res.status(401).send({ message: 'Invalid credentials' });
            }

            await User.update(
                { otp_secret: otp, otp_enabled: true },
                { where: { id: user.id } }
            );

            return res.status(200).send({
                message: 'OTP generated',
                status: true,
                data: {
                    email: user.email,
                    otp: otp
                }
            })

        } catch (error) {
            console.error("Error in generating OTP:", error);
            return res.status(500).send("Internal Server Error");
        }
    },

    async verifyOtp(req, res) {
        try {
            const { email, no_telp, otp } = req.body;

            let user;

            if (email) {
                user = await User.findOne({ where: { email: email } });
            } else if (no_telp) {
                user = await User.findOne({ where: { no_telp: no_telp } });
            }

            if (!user) {
                return res.status(401).send({ message: 'Invalid credentials' });
            }

            // console.log(user.otp_secret, otp)

            if (user.otp_secret !== otp) {
                return res.status(401).send({ message: 'Invalid OTP' });
            }

            await User.update({
                otp_secret: null,
                otp_enabled: false
            }, {
                where: { id: user.id }
            })

            const token = await createToken(user);
            res.cookie('token', token, { httpOnly: true, secure: true, maxAge: maxExpire * 1000 });
            return res.status(200).send({ 
                message: 'Logged in',
                status: true,
                data: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    no_telp: user.no_telp,
                    token: token
                }
             });
        } catch (error) {

        }
    },

    async logout(req, res) {
        try {
            res.clearCookie('token');
            return res.status(200).send({ message: 'Logged out' });
        } catch (error) {
            console.error("Error in logging out:", error);
            return res.status(500).send("Internal Server Error");
        }
    }
};
