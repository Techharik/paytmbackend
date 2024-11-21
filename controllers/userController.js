import { z } from 'zod';
import { userModal } from '../modals/usermodal.js';


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
        const updateUser = await userModal.updateOne({
            ...body
        }, { id: req.userId })

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

        res.json({
            success: true,
            message: users
        })
    } catch (e) {
        res.status(404).json({
            message: "Unknown error happen"
        })
    }
}


export {
    updateUserInfo,
    searchFilter
}