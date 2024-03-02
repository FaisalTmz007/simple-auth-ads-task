const Merchant = require('../models/').Merchant;
const { jwtDecoded } = require('../utils/jwtDecoded');

module.exports = {
    async create(req, res) {
        try {
            const userId = jwtDecoded(req.cookies.token);
            if (!userId) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            const merchant = await Merchant.create(req.body);
            return res.status(201).json({
                message: 'Merchant created',
                status: true,
                data: {
                    merchant: merchant
                }
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    async list(req, res) {
        try {
            const userId = jwtDecoded(req.cookies.token);
            if (!userId) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            const merchants = await Merchant.findAll();
            return res.status(200).json({
                message: 'Merchants found',
                status: true,
                data: {
                    merchants: merchants
                }
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    async retrieve(req, res) {
        try {
            const userId = jwtDecoded(req.cookies.token);
            if (!userId) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            const merchant = await Merchant.findByPk(req.params.id);
            if (!merchant) {
                return res.status(404).json({ error: 'Merchant not found' });
            }
            return res.status(200).json(
                {
                    message: 'Merchant found',
                    status: true,
                    data: {
                        merchant: merchant
                    }
                }
            );
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    async update(req, res) {
        try {
            const userId = jwtDecoded(req.cookies.token);
            if (!userId) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            const merchant = await Merchant.findByPk(req.params.id);
            if (!merchant) {
                return res.status(404).json({ error: 'Merchant not found' });
            }
            await merchant.update(req.body);
            return res.status(200).json(
                {
                    message: 'Merchant updated',
                    status: true,
                    data: {
                        merchant: merchant
                    }
                }
            );
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    async destroy(req, res) {
        try {
            const userId = jwtDecoded(req.cookies.token);
            if (!userId) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            const merchant = await Merchant.findByPk(req.params.id);
            if (!merchant) {
                return res.status(404).json({ error: 'Merchant not found' });
            }
            await merchant.destroy();
            return res.status(204).json({
                message: 'Merchant deleted',
                status: true,
                data: null
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
};