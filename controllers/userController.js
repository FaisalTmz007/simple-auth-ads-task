const User = require('../models/').User;
const { jwtDecoded } = require('../utils/jwtDecoded');
const { hashPassword } = require('../utils/hashPassword');
const { upload } = require('../middlewares/multer');
const fs = require('fs');

module.exports = {
    async myProfile(req, res) {
        try {
            const userId = jwtDecoded(req.cookies.token);
            if (!userId) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json({
                message: 'User found',
                status: true,
                data: {
                    user: user
                }
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async changeProfileImage(req, res) {
        try {
            const userId = jwtDecoded(req.cookies.token);
            if (!userId) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            upload(req, res, async (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                const user = await User.findByPk(userId);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                console.log(fs.existsSync(user.profile_img))
                if (user.profile_img) {
                    if (fs.existsSync(user.profile_img)) {
                        fs.unlinkSync(user.profile_img);
                    }
                }

                const profile_img = req.file.path;
                await User.update({ profile_img: profile_img }, { where: { id: userId } });

                return res.status(201).json({
                    message: 'Profile image updated',
                    status: true,
                    data: {
                        profile_img: profile_img
                    }
                });
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async deleteProfileImage(req, res) {
        try {
            const userId = jwtDecoded(req.cookies.token);
            if (!userId) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (user.profile_img) {
                if (fs.existsSync(user.profile_img)) {
                    fs.unlinkSync(user.profile_img);
                }
            }

            await User.update({ profile_img: null }, { where: { id: userId } });

            return res.status(200).json({
                message: 'Profile image deleted',
                status: true,
                data: {
                    profile_img: null
                }
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async getAllUsers(req, res) {
        try {
            const userId = jwtDecoded(req.cookies.token);

            if (!userId) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            const users = await User.findAll({
                attributes: { exclude: ['password', 'otp_secret'] }
            });
            return res.status(200).json({
                message: 'Get all users',
                status: true,
                data: {
                    users: users
                }
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    // Get specific user with params
    async getProfileUser(req, res) {
        try {
            const userId = jwtDecoded(req.cookies.token);
            if (!userId) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            const paramsId = parseInt(req.params.id);
            if(!paramsId) {
                return res.status(400).json({ message: 'User ID is required' });
            }

            const user = await User.findByPk(paramsId, {
                attributes: { exclude: ['password', 'otp_secret'] }
            });
            // console.log(user)

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json({
                message: 'User found',
                status: true,
                data: {
                    user: user
                }
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },        

    async updateMyProfile(req, res) {
        try {
            const userId = jwtDecoded(req.cookies.token);
            if (!userId) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const { username, email, no_telp, password } = req.body;

            if (password) {
                const hashedPassword = await hashPassword(password);

                await User.update({
                    username: username,
                    email: email,
                    no_telp: no_telp,
                    password: hashedPassword
                }, {
                    where: { id: userId }
                });

                return res.status(200).json({
                    message: 'Profile updated',
                    status: true,
                    data: {
                        password: hashedPassword
                    }
                });
            }

            // const hashedPassword = await hashPassword(password);

            await User.update({
                username: username,
                email: email,
                no_telp: no_telp,
                password: password
            }, {
                where: { id: userId }
            });

            return res.status(200).json({
                message: 'Profile updated',
                status: true,
                data: {
                    username: username,
                    email: email,
                    no_telp: no_telp
                }
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
};