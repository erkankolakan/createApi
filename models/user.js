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
    }
}, {timestamps: true})

  //User oluşturken ihtiyacımız olan 
  const validateRegister = (user) => { 
    const schema = new Joi.object({
        name: Joi.string().min(3).max(50).required(), 
        email: Joi.string().min(3).max(50).required().email(), 
        password: Joi.string().min(5).required(), 

    })
    return schema.validate(user) //user den gelen bilgileri schema ya göre validate et
}

  //User oluşturken ihtiyacımız olan 
  const validateLogin = (user) => { 
    const schema = new Joi.object({
        email: Joi.string().min(3).max(50).required().email(), 
        password: Joi.string().min(5).required(), 

    })
    return schema.validate(user) //user den gelen bilgileri schema ya göre validate et
}


/* Her user objesinin erişebileceği methotlar oluşturabiliriz */

userSchema.methods.createAuthToke = () => {
    return jwt.sign({id: this._id}, "jwtPrivateKey") 
/* this diyerek bu class dan türetilecek olan nesne için token üret demiş oluyoruz */
}

const User = mongoose.model("User" , userSchema)


module.exports = { User , validateRegister, validateLogin }
