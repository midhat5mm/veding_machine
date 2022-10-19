import User from "../database/models/User";
import jwt from 'jsonwebtoken';

export const buyerRoleCheck = async (req, res, next) => {
      const role = req.user.role;

      if(role === 'BUYER'){

        next()
      }
      else{
        res.status(401).json('Not authorized')
      }
};


export const sellerRoleCheck = async (req, res, next) => {
    const role = req.user.role;

    if(role === 'SELLER'){
      next()
    }
    else{
      res.status(401).json('Not authorized')
    }
};