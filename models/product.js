const mongoose = require("mongoose")
const Joi = require('joi');
const {Schema} = require("mongoose")

//SCHEMA
/*
ör/
    Yapılan yorumu ben iphone 14 ile ilişkilendiricem ve iphone 14 e yapılan yorum bilgileri de bana product bilgileri ile birlikte gelsin.
*/

const commentSchema = mongoose.Schema({
    text:String,
    username: String,
    date:{
        type:Date,
        default:Date.now
    }
})

const productSchema = mongoose.Schema({  //Şemamızı ayarladık
    name: String,
    price: Number,
    description: String,
    imageUrl: String,
    date: {
        type: Date, 
    default: Date.now 
    },
    isActive: Boolean,
    category: {type: Schema.Types.ObjectId, ref: "Category"},
    comments: [commentSchema] //-> birden fazla yorum geliceği için dizi şeklide tanımlıyoruz. Yukarıda tanımlamış olduğumuz değeri burada dizi içinede yazabilirdik ama karmaşıklık olmasın diye bu şekilde yazmak daha mantıklı. CommentSchema name price değerleri ile aynı aynıdır. Bu da diğerleri gibi direk yüklenir ama. category değil biz categorynin idsini tutarız.

 

});

    //validate
const validateProduct = (product) => {  //Şemamız için validation ayarlarını yaptık
    const schema = new Joi.object({
        name: Joi.string().min(3).max(30).required(), 
        price: Joi.number().min(0).required(),
        description: Joi.string(),
        imageUrl: Joi.string(),
        isActive: Joi.boolean(),
        category: Joi.string(),
        comments: Joi.array()
    })
    return schema.validate(product)
}

const Product = mongoose.model("Product" , productSchema)  //productSchema şeması üzerinden Product adında bir model oluşturduk

module.exports = {Product , validateProduct } 


/*
    bir dökümanı farklı bir döküman içerisinde nasıl saklarız.
ör/
    bir ürüne yapılan yorumları da gidip farklı bir tabloda, ayrı biyerde tutmak çok mantıklı değildir.



*/
