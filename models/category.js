const mongoose = require("mongoose")
const Joi = require('joi');

const categorySchema = mongoose.Schema({
    name: String,
})

  //validate
  const validateCategory = (product) => {  //Şemamız için validation ayarlarını yaptık
    const schema = new Joi.object({
        name: Joi.string().min(3).max(30).required(), 
    })
    return schema.validate(product)
}


const Category = mongoose.model("Category" , categorySchema)


module.exports = {Category , validateCategory }