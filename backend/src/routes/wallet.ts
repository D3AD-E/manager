import { Router, Request, Response } from 'express';
const Wallet = require('./../models/wallet').Wallet;
const router = Router();

router.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const wallet = await Wallet.findByPk(id);
        if (wallet) {
            res.send(wallet);
        } else {
            res.status(404).send({ message: 'Wallet not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Server error' });
    }
});

export default router;