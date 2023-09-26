const express = require("express")
const app = express()

const mongoose = require("mongoose")

const products = require("./routes/products")
const home = require("./routes/home")
const cors = require("cors")

app.use(express.json()) //gelen datanın Json olarak okunacağını söylüyoruz

app.use(cors({
    origin:"*",  
    methods:["GET" , "POST"]
})) 


app.use("/api/product", products )
app.use( "/", home )

//serverimize bu şekilde bağlanıyoruz
mongoose.connect("mongodb+srv://erkankolakan:tmVuxo01HxJRuSz2@cluster0.shuzdaz.mongodb.net/?retryWrites=true&w=majority")
    .then( () => { console.log("mongoDB bağlantısı başarılı")})
    .catch( (err) => { err })

//SCHEMA
    const productSchema = mongoose.Schema({ 
        name: String,
        price: Number,
        description: String,
        imageUrl: String,
        date: {
            type: Date,
        default: Date.now //her zaman anlık değeri alısın. Date ye date: Date şeklinde de tanımlanabilirdi
        },
        isActive: Boolean
    });

//MODEL
    const Product = mongoose.model("Product" , productSchema) //-> modelin ismi Product, Product modeline productSchema Schemasını verdik

//tanımladığımız bu model sayesinde bir çok method kulllanabiliriz. Bu sayede veri tabanına yükleme silme güncellleme işlemlerini yapabiliriz

//nesne => Product -- product sınıfından türetilmiş bir nesneye ihtiyacımız var. ör/ p1 nesenesi türeticez ve içerisini productSchema sındaki bilgilerle türeticez ve p1 üzerinden save methodunu kullanarak veri tabanına kaydedicez.


app.listen(3000 , () => {
    console.log("listening on port 3000")
}) 