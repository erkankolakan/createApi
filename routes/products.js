const express = require("express")
const router = express.Router()

//modeller
const {Product , validateProduct} = require("../models/product")

 /*
    Query Operators
    eq => equal -- eşistlik
    ne => not equal -- eşit değildir
    gt => greater than -- daha büyük >
    gte => greater than or equal -- daha büyük ya da eşit >=
    lt => less than -- küçüktür <
    lte => less than or equal -- küçüktür ya da eşit <=
    in => [10 , 20 , 30] -- fiyatı 10 , 20 , 30 olan öğeleri al  
    nin => [10 , 20 , 30] -- fiyatı 10 , 20 , 30 olmayan öğeleri al  
 */

router.get("/", async(req ,res) => {
    // const products = await Product.find() 
    // const products = await Product.fing({price : {$ne : 10000}}) // price != 10000 olmayan tüm öğeleri al
    // const products = await Product.fing({price : {$gt : 10000}}) // price > 10000  olan tüm öğeleri al
    // const products = await Product.fing({price : {$gte : 10000}})//price >= 10000  olan tüm öğeleri al
    // const products = await Product.fing({price : {$lt : 10000}}) // price < 10000  olan tüm öğeleri al
    // const products = await Product.fing({price : {$lte : 10000}}) // price <= 10000  olan tüm öğeleri al
    // const products = await Product.fing({price : {$in :[10000 ,20000]}}) // fiyatı 10000 ile 20000 eşit olan öğeleri al
    // const products = await Product.fing({price : {$nin :[10000 ,20000]}}) // fiyatı 10000 ile 20000 e eşit olmayan öğeleri al
    // const products = await Product.fing({price : {$gte : 10000 , $lte: 20000 }}) // price >= 10000 && price <= 20000
    // const products = await Product.fing({price : {$gte : 10000 , $lte: 20000 } , name: "Iphone" }) // Bu şekilde yazarak fiyatı 10000 ile 20000 arasında olan ve name i Iphone olan öğeleri al. Burada aslında AND operatoru kullanmış oluyoruz
/*  const products = await Product.fing()
                                .or([
                                    { price : {$gte : 10000 }}, //1.kriter
                                    {isActive: true } //2. kriter
                                ]) // or demek içinde yani yada demek içinde bu şekilde kullanmamız gerekir or.([]) köşeli parantez kullanmayı unutma. Fiyatı (10000 >= or isActive== true) olan değerleri al */

// startwith --> herhangi bir bilgiyle başlıyor mu ?

// const products = await Product.find({ name: /^iphone/}i) //sonu önemli değil, iphone ile başlayan tüm öpeleri al 

// end with --> herhangi bir bilgiyle bitiyor mu ?

// const products = await Product.find({name: /iphone$/}i) //başlangıcı önemli değil sonu iphone ile başlayan tüm öğeleri al.

// contains

    const products = await Product.find({name: /.*iphone.*/i}) //içerisinde iphone geçen tüm öğeleri al !! büyük küçük harf önemli olmasın diyorsanız sonuna i eklememiz gerekir. i eklemezsek girilen kelimede büyük küçük harfe bakar.

 
    res.send(products)
})

router.post("/", async (req ,res) => {
        const {error} = validateProduct(req.body)

        if ( error ) {
            return res.status(400).send(error.details[0].message)
        }

        //Nesne
        const product = new Product({ //Product sınıfı üzerinden p adında bir nesne oluşturduk.
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            isActive: req.body.isActive          
        });

        try {
            const result = await product.save();
            res.send(result);
            
        } catch (err) {
            console.log(err);
        }
    })
  

router.put("/:id", async(req ,res) =>{
    const id = req.params.id
    const product = await Product.findById({_id:id});
    if (!product) {
        return res.status(400).send("aradığınız ürün bulunamadı")
    }
    const {error} = validateProduct(req.body)   

    if ( error ) { 
        return res.status(400).send(result.error.details[0].message)
    }

   product.name = req.body.name; 
   product.price = req.body.price;
   res.send(product)
})


router.delete("/:id" , async(req, res) => {
    const id = req.params.id
    const product = await Product.findById({_id:id});

    if (!product) {
        return res.status(404).send("Böyle bir ürün bulunamadı")
    }

    const index = products.indexOf(product) 

    products.splice(index, 1) 
    res.send(product)
})


router.get("/:id" , async(req, res) => {
    const id = req.params.id
    const product = await Product.findById({_id:id});

    if (!product) {
        return res.status(404).send("Böyle bir ürün bulunamadı")
    }
    res.send(product)
})



module.exports = router



/*
Query Oparators
-- const products = await Product.find({price :10000 , isActive: true }) //where koşulu gibi price değeri 10000 olanı getir demiş olduk
-- const products = await Product.find({isActive: true }).select({ name:1 }) // name değerine 1 dersek sadece name kolonunu diğerlerinini 0 kabul eder. Eğer name değerine 0 dersek name değerini almaz diğer tüm kolonları alır
-- const products = await Product.find({isActive: true }).limit(2).select({ name:1 }) // bu şekilde limit yazarsak gelen 100 tane obje varsa 10 tanesini alır.

*/