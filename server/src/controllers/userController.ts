import User from "../database/models/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Product from "../database/models/Product";

const VALID_COINS = [100, 50, 20, 10, 5];


const createUser = async function (req, res) {
    const { username, password, role} = req.body;
    if (!username || !username || !role) {
        res.status(400).json('Invalid Input')
      }
    
    // Check if user exists
    const userExists = await User.findOne({ username })
  
    if (userExists) {
      res.status(400).json('User already exists')
    }
  
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
  
    // Create user
    const user = await User.create({
      username,
      password: hashedPassword,
      role
    })
  
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.username,
        token: generateToken(user._id),
      })
    } else {
      res.status(400).json('Invalid user data')
    }
};

const deposit = async function (req, res) {
  const { coins } = req.body;

  if(!coins?.length){
    res.status(400).json('Invalid user data')
  }

  let newDeposit = 0;

  coins.forEach(coin => {
    if(!VALID_COINS.includes(coin)){
      res.status(400).json('Invalid user data')
    }
    newDeposit += coin;
  })

  // this should be fixed
  const currentDeposit = req.user.deposit || 0;
  const user =await User.findOneAndUpdate(
    {
      _id: req.user._id,
    },{
      $set: {
        deposit: currentDeposit + newDeposit
      }
    },
    {$new: true}
  )  
  res.status(200).json(user);
}

const reset = async function (req, res) {

  const user =await User.findOneAndUpdate(
    {
      _id: req.user._id,
    },{
      $set: {
        deposit: 0
      }
    },
    {$new: true}
  )  
  res.status(200).json(user);
}


const calculateChange = (change: number) => {
  let validatedChange = [];
  let total = change;
  VALID_COINS.forEach(el => {
    let tempVal = total - el;
    if(tempVal >= 0){
      let arraySizePush = Math.floor(total / el);
      validatedChange.push(...Array(arraySizePush).fill(el));
      total -= el*arraySizePush;
    }
  })
  return validatedChange
}

const buy = async function (req, res) {
  const { productId, amount } = req.body;

  if(!productId || !amount) {
    res.status(400).json('Invalid user data')
  }

  const product = await Product.findById({
    _id: productId
  });

  if(product.amountAvailable < amount){
    res.status(406).json('No amount available')
  }

  const price: number = product.cost as number * amount;

  if(req.user.deposit < price){
    res.status(406).json('Insignificant funds')
  }

  const changeNumber = req.user.deposit - price;

  await Product.findOneAndUpdate(
    {
      _id: productId
    },{
      $set: {
        amountAvailable: product.amountAvailable as number - amount      
      }
    }
  )  

  // update seller deposit(not sure if we should do this)
  // await User.findOneAndUpdate(
  //   {
  //     _id: product.sellerId
  //   },{
  //     $set: {
  //       deposit:      
  //     }
  //   }
  // )  

  res.status(200).json({
    totalSpend: price,
    productName: product.productName,
    change: calculateChange(changeNumber)
  })

}

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }


export const userController = {
    createUser,
    deposit,
    reset,
    buy,
}