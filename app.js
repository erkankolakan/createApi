const express = require("express")
const app = express()

//http methods: get, post, put, delete

const products = [
    {id:1 , name:"iphone 12" , price:2000},
    {id:2 , name:"iphone 13" , price:3000},
    {id:3 , name:"iphone 14" , price:4000}
]



app.get("/" , (req, res ) => {
    res.send("popüler ürünler")

// normalde biz res.return yazarak geriye bir sayfa döndürüyorduk ama biz artık bir bir api yazıyoruz ve geriye bir sayfa döndürmüyoruz. Geriye bir json döndürüyoruz. O yüzden dolasyı da retun retun yerine SEN kullanıyoruz.
})

app.get("/api/product/:id" , (req, res) => {
    console.log(req.query)
    console.log(req.params)

    const product = products.find(p => p.id == req.params.id);

    if (!product) {
         res.status(404).send("Böyle bir ürün bulunamadı")
    }

    res.send(product)
     
})


app.listen(3000 , () => {
    console.log("listening on port 3000")
})