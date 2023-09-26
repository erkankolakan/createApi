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
    const products = await Product.find() 

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
  


/* 1. yol -- query first - findbtid ile öğe alnır ve yeni değerler verilerek save() edilir
   2. yol -- update diyerek tek işlemde güncelleyebiliriz */

router.put("/:id", async(req ,res) =>{

    //1. parametre öğe seçme işlemi, 2. parametrede ise hangi alanları set etmek istiyorzu yanii güncellemek istiyorsunuz.

    const id = req.params.id

    const product = await Product.findByIdAndUpdate({_id: id},{
            $set:{
                name : req.body.name,
                price : req.body.price,
                description : req.body.description,
                imgUrl : req.body.imgUrl,
                isActive : req.body.isActive,
            }
        },{new:true});

        res.send(product);
    /* burada result bize update edilen kayıt sayısını veririr. Ama bu öğeyi güncelledi gerçeğini değiştirmiyor.
        Bunun güzel yani öğeyi seçiyim sonra gidiyim güncelliyim diye birşey yok tek sorguda seçip güncelliyoruz.
        Sadece id ile alakalı değil istersek isActive si true olantüm ürünleri güncelle diyebiliriz

        !!! updateOne demek yerine findByIdAndUpdate diyerek güncellemeden önceki değerleri alabiliriz 
        !!! yine findByIdAndUpdate kullanarak ve 3. parametreye {new: true} diyerek güncellemeden sonraki değeri alabiliriz
    */


//     const id = req.params.id
//     const product = await Product.findById({_id:id});


//     if (!product) {
//         return res.status(400).send("aradığınız ürün bulunamadı")
//     }
//     const {error} = validateProduct(req.body)   

//     if ( error ) { 
//         return res.status(400).send(result.error.details[0].message)
//     }

//    product.name = req.body.name; 
//    product.price = req.body.price;
//    product.description = req.body.description;
//    product.imgUrl = req.body.imgUrl;
//    product.isActive = req.body.isActive;
//    res.send(product)

//    const updatedProduct = await product.save()
//    res.send(updatedProduct)
});


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