import express from "express"
import authUser from "../middlewares/authUser.js";
import { fetchCart, updateCart } from "../controllers/cartController.js";


const cartRouter = express.Router();

cartRouter.post('/update', authUser, updateCart)
cartRouter.get('/fetch', authUser, fetchCart)

export default cartRouter;