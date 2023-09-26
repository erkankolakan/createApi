const express = require("express")
const app = express()

const mongoose = require("mongoose")

const products = require("./routes/products")
const categories = require("./routes/categories")
const home = require("./routes/home")
const cors = require("cors")

app.use(express.json()) //gelen datanın Json olarak okunacağını söylüyoruz

app.use(cors({
    origin:"*",  
    methods:["GET" , "POST"]
})) 

app.use("/api/product", products )
app.use( "/api/categories", categories)
app.use( "/", home )


//serverimize bu şekilde bağlanıyoruz

const userName = "erkankolakan"
const password = "tmVuxo01HxJRuSz2"
const dataBase = "shopdb"

//--> burası normalde  mongodb.net/?retryWrites= bu şekilde biz /? arasına data basenin ismi  ne olsun istiyorsak onu yazıyoruz
mongoose.connect(`mongodb+srv://${userName}:${password}@cluster0.shuzdaz.mongodb.net/${dataBase}?retryWrites=true&w=majority`)
    .then( () => { console.log("mongoDB bağlantısı başarılı")})
    .catch( (err) => { err })

 
app.listen(3000 , () => {
    console.log("listening on port 3000")
}) 