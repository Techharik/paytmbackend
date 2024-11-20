import { z } from 'zod';
import { userModal } from '../modals/usermodal.js';


const updateBody = z.object({
    password: z.string(),
    firstname: z.string(),
    lastname: z.string()
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


export {
    updateUserInfo
}