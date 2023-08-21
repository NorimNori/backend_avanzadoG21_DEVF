const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/users_models')

const registerUser = asyncHandler(async( req, res ) => {

    //se desestructura el req.body
    const { name, email, password } = req.body

    //se verifica que se pasen todos los datos requeridos
    if (!name || !email || !password){
        res.status(400)
        throw new Error('Missing data, please check')
    }

    //se verica que ese usuario exista
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('This user already exists')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Se crea el usuario
    const user = await User.create({
        name, 
        email,
        password: hashedPassword
    })

    if (user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else { 
        res.status(400)
        throw new Error('Could not save user record')
    }
})

const loginUser = asyncHandler(async( req, res ) => {

    //desestructuramos los datos del req.body
    const { email, password } = req.body

    //se verifica que se pasen todos los datos requeridos
    if(!email || !password){
        res.status(400)
        throw new Error('Missing data, please check')
    }

        //se verifica que se pasen todos los datos requeridos
    if(!email || !password){
        res.status(400)
        throw new Error('Missing data, please check')
    }

    //buscar que el usuario exista 
    const user = await User.findOne({ email })

    //verificar el password
   if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
    })
   } else{
    res.status(401)
    throw new Error ('Incorrect email or password')
   }
})

const getUserData = asyncHandler(async( req, res ) => {
    res.json(req.user)
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '13m'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUserData
}