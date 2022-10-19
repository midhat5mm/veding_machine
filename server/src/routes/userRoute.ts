import { Router } from "express";
import { userController } from '../controllers/userController'
import { auth } from "../middleware/authMIddleware";
import { buyerRoleCheck } from "../middleware/roleCheck";
export const userRoute = Router();

userRoute.route('/').post(userController.createUser)
userRoute.route('/deposit').post(auth, buyerRoleCheck, userController.deposit)
userRoute.route('/reset').post(auth, buyerRoleCheck, userController.reset)
userRoute.route('/buy').post(auth, buyerRoleCheck, userController.buy)