const express = require("express")
const app = express()

//http methods: get, post, put, delete

app.use(express.json()) //gelen datanın Json olarak okunacağını söylüyoruz

const products = [
    {id:1 , name:"iphone 12" , price:2000},
    {id:2 , name:"iphone 13" , price:3000},
    {id:3 , name:"iphone 14" , price:4000}
]

app.get("/" , (req, res ) => {
    res.send(products[0])
// normalde biz res.return yazarak geriye bir sayfa döndürüyorduk ama biz artık bir bir api yazıyoruz ve geriye bir sayfa döndürmüyoruz. Geriye bir json döndürüyoruz. O yüzden dolasyı da retun retun yerine SEN kullanıyoruz.
})

app.get("/api/product", (req ,res) => {
    res.send(products)
})

app.post("/api/product", (req ,res) => {
    const product = {
        id: products.length + 1, // -> gelecek olan datanın idsi olsun 
        name: req.body.name, // gelen datanın içindeki formdan name ismindeki değeri alıyoruz
        price: req.body.price
    };
    products.push(product);
    console.log(req.body)
    res.send(product) //gelen bilginin kaydolup olmadığını kullanıcıya göstermek amacıyla bir 
})
  
app.get("/api/product/:id" , (req, res) => {

    const product = products.find(p => p.id == req.params.id);

    if (!product) {
         res.status(404).send("Böyle bir ürün bulunamadı")
    }

    res.send(product)
     
})

app.listen(3000 , () => {
    console.log("listening on port 3000")
})