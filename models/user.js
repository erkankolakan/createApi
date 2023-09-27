const mongoose = require("mongoose")
const Joi = require('joi');


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

  //validate
  const validateUser = (user) => { 
    const schema = new Joi.object({
        name: Joi.string().min(3).max(50).required(), 
        email: Joi.string().min(3).max(50).required().email(), 
        password: Joi.string().min(5).required(), 

    })
    return schema.validate(user) //user den gelen bilgileri schema ya göre validate et
}

const User = mongoose.model("User" , userSchema)


module.exports = { User , validateUser }