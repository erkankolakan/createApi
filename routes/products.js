const express = require("express")
const router = express.Router()

//modeller
const {Product , validateProduct} = require("../models/product")

    const products = [
        {id:1, name:"iphone 13", price: 20000},
        {id:2, name:"iphone 13", price: 30000},
        {id:3, name:"iphone 13", price: 40000}
    ]

router.get("/", (req ,res) => {
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


router.get("/:id" , (req, res) => {

    const product = products.find(p => p.id == req.params.id);

    if (!product) {
        return res.status(404).send("Böyle bir ürün bulunamadı")
    }
    res.send(product)
})



module.exports = router