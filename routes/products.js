const express = require("express")
const router = express.Router()

//modeller
const {Product , validateProduct} = require("../models/product")

 

router.get("/", async(req ,res) => {
    const products = await Product.find() //Product üzerinde olan tüm veriyi alır
    // const products = await Product.find({price :10000 , isActive: true }) //where koşulu gibi price değeri 10000 olanı getir demiş olduk
    // const products = await Product.find({isActive: true }).select({ name:1 }) // name değerine 1 dersek sadece name kolonunu diğerlerinini 0 kabul eder. Eğer name değerine 0 dersek name değerini almaz diğer tüm kolonları alır
    // const products = await Product.find({isActive: true }).limit(2).select({ name:1 }) // bu şekilde limit yazarsak gelen 100 tane obje varsa 10 tanesini alır.
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
  

router.put("/:id", (req ,res) =>{
    //ilgili id ye göre ürünü almamız gerekir
    const product = products.find(p => p.id == req.params.id);
    if (!product) {
        return res.status(400).send("aradığınız ürün bulunamadı")
    }
    //validate
    //güncellemek istediği ürünü validate işlemine tabi tutmamız gerekir
    const {error} = validateProduct(req.body)   

    if ( error ) { //result dan hata gelirse direk sayfaya bu hatayı yazdır
        return res.status(400).send(result.error.details[0].message)
    }

   product.name = req.body.name; 
   product.price = req.body.price;
   res.send(product)
})


router.delete("/:id" , (req, res) => {

    const product = products.find(p => p.id == req.params.id);

    if (!product) {
        return res.status(404).send("Böyle bir ürün bulunamadı")
    }

    const index = products.indexOf(product) //products dizisi içine bak parametreden gelen id değerine eşit index değeri varsa o objeyi seçç

    products.splice(index, 1) //index konumundan itibaren 1 tane değer sil

    res.send(product)
})


router.get("/:id" , async(req, res) => {
    const id = req.params.id
    // const product = await Product.find({_id:id});
    // const product = await Product.findOne({_id:id});
    const product = await Product.findById({_id:id}); //hepsini kullanabiliriz 

    if (!product) {
        return res.status(404).send("Böyle bir ürün bulunamadı")
    }
    res.send(product)
})



module.exports = router