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

const userName = "erkankolakan"
const password = "tmVuxo01HxJRuSz2"
const dataBase = "shopdb"

//--> burası normalde  mongodb.net/?retryWrites= bu şekilde biz /? arasına data basenin ismi  ne olsun istiyorsak onu yazıyoruz
mongoose.connect(`mongodb+srv://${userName}:${password}@cluster0.shuzdaz.mongodb.net/${dataBase}?retryWrites=true&w=majority`)
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
        default: Date.now 
        },
        isActive: Boolean
    });

//MODEL
    const Product = mongoose.model("Product" , productSchema) 

//Nesne
    const prd = new Product({ //Product sınıfı üzerinden p adında bir nesne oluşturduk.
        name: "iphone 14",
        price: 30000,
        description:"iyi telefon",
        imageUrl:"1.jpg",
        isActive: true          
    });

    (async () => {
        try {
        const result = await prd.save();
        console.log(result);
                                                    //-> nesneyi veri tabanına kaydettik
        } catch (err) {
            console.log(err);
        }
    })();              
 
app.listen(3000 , () => {
    console.log("listening on port 3000")
}) 