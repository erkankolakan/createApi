const express = require("express")
const app = express()
const Joi = require('joi');

app.use(express.json()) //gelen datanın Json olarak okunacağını söylüyoruz

const products = [
    {id:1 , name:"iphone 12" , price:2000},
    {id:2 , name:"iphone 13" , price:3000},
    {id:3 , name:"iphone 14" , price:4000}
]

app.get("/" , (req, res ) => {
    res.send(products[0])
})

app.get("/api/product", (req ,res) => {
    res.send(products)
})

app.post("/api/product", (req ,res) => {

    const {error} = validateProduct(req.body)

    if ( error ) { //result dan hata gelirse direk sayfaya bu hatayı yazdır
        return res.status(400).send(result.error.details[0].message)
    }

    const product = {
        id: products.length + 1, 
        name: req.body.name, 
        price: req.body.price
    };
    products.push(product);
    console.log(req.body)
    res.send(product) 
})
  
//put güncelleme işlemleri için kullanılır
app.put("/api/product/:id", (req ,res) =>{
    //ilgili id ye göre ürünü almamız gerekir
    const product = products.find(p => p.id == req.params.id);
    if (!product) {
        return res.status(400).send("aradığınız ürün bulunamadı")
    }
    //validate
    //güncellemek istediği ürünü validate işlemine tabi tutmamız gerekir
    const {error} = validateProduct(req.body)   //-> {error} yazmamız gelen array içinden error bilgisini al demek, başka bir değer almak istiyorsak {error , ressult } şeklinde de kullanılabilir

    if ( error ) { //result dan hata gelirse direk sayfaya bu hatayı yazdır
        return res.status(400).send(result.error.details[0].message)
    }

   product.name = req.body.name; //şuan hangi id yi seçtiysek o product oluyor onun name değerini yeni gelen name değeri ile değiştiriyoruz
   product.price = req.body.price;
   res.send(product)
})


app.delete("/api/product/:id" , (req, res) => {

    const product = products.find(p => p.id == req.params.id);

    if (!product) {
        return res.status(404).send("Böyle bir ürün bulunamadı")
    }

    const index = products.indexOf(product) //products dizisi içine bak parametreden gelen id değerine eşit index değeri varsa o objeyi seçç

    products.splice(index, 1) //index konumundan itibaren 1 tane değer sil

    res.send(product)
})


app.get("/api/product/:id" , (req, res) => {

    const product = products.find(p => p.id == req.params.id);

    if (!product) {
        return res.status(404).send("Böyle bir ürün bulunamadı")
    }
    res.send(product)
})

    //validate
const validateProduct = (product) => {
    const schema = new Joi.object({
        name: Joi.string().min(3).max(30).required(),
        price: Joi.number().min(0).required()
    })
    return schema.validate(product)
}



app.listen(3000 , () => {
    console.log("listening on port 3000")
})