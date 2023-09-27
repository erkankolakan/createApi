const {mongoose,  Schema} = require("mongoose")
const Joi = require('joi');


/* -> Kategoriye çoklu ürün ataması
ör/
    iki tane ürünü telefon kategorisinde saklayalım bu sayede ben ilgili kategoriyi çağırdığım zaman o kategoriyle alaklı ürünler benim önüme gelmiş olsun.
*/

const categorySchema = mongoose.Schema({
    name: String,
    products :[{type: Schema.Types.ObjectId, ref:"Product"}]
})

  //validate
  const validateCategory = (product) => { 
    const schema = new Joi.object({
        name: Joi.string().min(3).max(30).required(), 
        products: Joi.array()
    })
    return schema.validate(product)
}

const Category = mongoose.model("Category" , categorySchema)


module.exports = {Category , validateCategory }
