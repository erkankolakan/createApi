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



/*
İLİŞKİ TÜRLERİ

** reference -- referans tutmak aslında SQL yapsındaki yabancı anahtar kavramına benziyor ve bilgilerin ayrı bir döküman içinde saklanması.
ör/

var egitmen = {
    id: 1,
    name: "Erkan"
}


var kurs = {
    title: "node.js",
    egitmen: "reference" -- burda referans vermemiz gerek örneğin node.js dersini sadık veriyorsa 1 no lu id
}

-----------------------------------------------------------------------------------
** embedded documents -- ilişkileri aynı döküman içersinde saklayabiliriz. 
ör/

    var kurs = {
        title: "aspp.net",
        egitmen: {              -- bir döküman içinde farklı bir döküman saklanmış oluyor
            name: "Erkan"
        }
    }

-----------------------------------------------------------------------------------
** hybrid -- her ikisinide kullandığımız karışık sistem.
ör/

    var product = {
        name: "samsung s22",
        price: 20000,               //--> güncell fiyat
        desc: ""
    }

    var order = {
        id :1,
        date: "",
        product:{
            name: "samsung s22",          
            price:  19000,          //--> kullanıcı sipariş verdiği tarihteki ürün fiyatı. Sonuçta sonra dan fiyat artıyor

        }
    }
product bilgisindeki tüm bilgileri getirmeye gerek yok en çok kullanılan bilgileri almamız yeterli. Eğer product üzerinden başka bir bilgiye ihtiyacımız olursada order a  vermiş olduğumuz product referansından ulaşabiliriz. Yani ben istediğim zaman productın detayına gitmek istediğim zaman id yi kullanım detayına gidebilirim Bu sayede extra bir sorgu yazmak zorunda kalmayız. Order üzerinden ürün ismi ve fiyatına da zaten direk ulaşabiliyoruz

*/ 

