const mongoose = require("mongoose")
const Joi = require('joi');

//SCHEMA
const productSchema = mongoose.Schema({  //Şemamızı ayarladık
    name: String,
    price: Number,
    description: String,
    imageUrl: String,
    date: {
        type: Date,
    default: Date.now 
    },
    isActive: Boolean
});

    //validate
const validateProduct = (product) => {  //Şemamız için validation ayarlarını yaptık
    const schema = new Joi.object({
        name: Joi.string().min(3).max(30).required(), 
        price: Joi.number().min(0).required(),
        description: Joi.string(),
        imageUrl: Joi.string(),
        isActive: Joi.boolean()
    })
    return schema.validate(product)
}

const Product = mongoose.model("Product" , productSchema)  //productSchema şeması üzerinden Product adında bir model oluşturduk

module.exports = {Product , validateProduct } //dizi şeklinde validasyonu ve Product modelini dışarı açtık