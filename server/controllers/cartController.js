import User from "../models/User.js"

// Update User CartData : /api/cart/update

export const updateCart = async (req, res)=>{
    try {
        const { userId, cartItems } = req.body
        console.log(cartItems);
        
        await User.findByIdAndUpdate(userId, {cartItems})
        res.json({ success: true, message: "Cart Updated" })
        
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const fetchCart = async (req,res) => {
    try {
        const {userId} = req.body;
        let data = await User.findById(userId)
        console.log(data);
        let cartItems = data?.cartItems
        res.json({ success: true, message: "Cart Updated", cartItems })
        
    } catch (error) {
        console.log(error);
    }
}