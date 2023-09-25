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

app.listen(3000 , () => {
    console.log("listening on port 3000")
}) 