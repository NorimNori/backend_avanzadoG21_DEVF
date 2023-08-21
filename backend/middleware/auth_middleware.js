const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/users_models')

//Funcion protectora que sirve para proteger las rutas, verificar que la firma que sea correcta y obtener los datos del usuario a traes del id que se encuentra en el token
const protect = asyncHandler(async (req, res, next) => {

    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //obtenemos el token del encabezado
            token = req.headers.authorization.split(' ')[1]

            //verificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //obtener los datos del usuario con el id del payload del token
            req.user = await User.findById(decoded.id).select('-password')

            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Unauthorized access')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Unauthorized access, missing token')
    }

})

module.exports = {protect}