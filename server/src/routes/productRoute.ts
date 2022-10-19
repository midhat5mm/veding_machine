import { Router } from "express";
import { productController } from '../controllers/productController'
import { auth } from "../middleware/authMIddleware";
import { checkProductSeller } from "../middleware/checkProductSeller";
import { sellerRoleCheck } from "../middleware/roleCheck";
export const productRoute = Router();

productRoute.route('/')
    .get(auth, sellerRoleCheck, checkProductSeller, productController.getProduct)
    .post(auth, sellerRoleCheck, productController.postProduct)
    .put(auth, sellerRoleCheck, checkProductSeller, productController.putProduct)
    .delete(auth, sellerRoleCheck, checkProductSeller, productController.deleteProduct)
