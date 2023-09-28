const mongoose = require("mongoose")
const Joi = require('joi');
const jwt = require("jsonwebtoken")


const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true //bu değer boş geçilemez
    },
    email:{
        type: String,
        required: true,
        unique: true // her email sadece bir kez kullanılanbilir.
    },
    password:{
        type: String,
        required: true,
    },
    isAdmin: Boolean
}, {timestamps: true})

  const validateRegister = (user) => { 
    const schema = new Joi.object({
        name: Joi.string().min(3).max(50).required(), 
        email: Joi.string().min(3).max(50).required().email(), 
        password: Joi.string().min(5).required(), 

    })
    return schema.validate(user)
}
  const validateLogin = (user) => { 
    const schema = new Joi.object({
        email: Joi.string().min(3).max(50).required().email(), 
        password: Joi.string().min(5).required(), 

    })
    return schema.validate(user)
}


/* Her user objesinin erişebileceği methotlar oluşturabiliriz */
userSchema.methods.createAuthToke = function() { //bu fonksiyonda this kullandığımız için normal function kullanmalıyız arrow olmaz
    const decodedToken =  jwt.sign({
        id: this._id,
        isAdmin: this.isAdmin //-> giriş yapan kullanıcın isAdmin bilgisinide token içinde tutuyoruz.
    },
    "jwtPrivateKey") 
    return decodedToken
}

const User = mongoose.model("User" , userSchema)


module.exports = { User , validateRegister, validateLogin }
