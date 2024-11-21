import { z } from 'zod';
import { userModal } from '../modals/usermodal.js';
import { Account } from '../modals/bankSchema.js';
import mongoose from 'mongoose';



const updateBody = z.object({
    password: z.string().optional(),
    firstname: z.string().optional(),
    lastname: z.string().optional()
})


const updateUserInfo = async (req, res) => {
    const body = req.body;
    const { success } = updateBody.safeParse(body)

    if (!success) {
        return res.status(400).json({
            success: false,
            message: 'validation failed'
        })
    }

    try {
        const updateUser = await userModal.updateOne({ _id: req.userId }, {
            ...body
        }, { runValidators: true })

        res.status(200).json({
            success: true,
            data: updateUser,
            message: 'User Updated Successfully'
        })

    } catch {
        res.status(402).json({
            success: false,
            message: 'Unknown error' + e
        })
    }


}

const searchFilter = async (req, res) => {
    const search = req.query.filter || ''

    try {

        const users = await userModal.find({
            $or: [
                {
                    firstname: {
                        "$regex": search,
                        "$options": 'i'
                    }
                }, {
                    lastname: {
                        '$regex': search,
                        "$options": 'i'
                    }
                }
            ]
        });
        const totalSearch = users.length
        res.json({
            success: true,
            message: users,
            TotalUser: totalSearch
        })
    } catch (e) {
        res.status(404).json({
            message: "Unknown error happen"
        })
    }
}

const bankBalance = async (req, res) => {
    const user = await userModal.findOne({ _id: req.userId })

    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'User Not found'
        })
    }
    try {
        const BanckBalance = await Account.findOne({ userId: req.userId });

        res.status(200).json({
            success: true,
            amount: BanckBalance.balance
        })
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: 'Invalid error' + e
        })
    }


}

const transferAmount = async (req, res) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    //get the reciver id
    const { recerverId, amount } = req.body;

    //check the sender amount within the limit.
    const sender = await Account.findOne({ userId: req.userId }).session(session)

    const senderLimit = sender.balance < amount;

    if (senderLimit) {
        await session.abortTransaction();
        return res.status(401).json({
            success: false,
            message: 'amount exceeds the min Balance'
        })
    }

    const Receiver = await userModal.findOne({ _id: recerverId }).session(session)

    if (!Receiver) {
        await session.abortTransaction()
        return res.status(401).json({
            success: false,
            message: 'Receiver id invalid not found'
        })
    }

    const deductAmmount = await Account.updateOne({ userId: req.userId }, { $inc: { balance: - amount } }).session(session)

    const receiverIncAmount = await Account.updateOne(
        { userId: recerverId },
        { $inc: { balance: amount } }
    ).session(session)
    await session.commitTransaction();
    res.status(200).json({
        message: 'Fund Transfered Successfully'
    })
}

export {
    updateUserInfo,
    searchFilter,
    bankBalance,
    transferAmount
}