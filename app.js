const express = require("express")
const app = express()

const products = require("./routes/products")
const home = require("./routes/home")
const cors = require("cors")

app.use(express.json()) //gelen datanın Json olarak okunacağını söylüyoruz

app.use(cors({
    origin:"*",  //belirli adreslen eklenebilir abc.com şeklinde, Bir kaçtene adres ekliyiceksek bir dizi gönderiyoruz. ["abx.com" , "lkasmd.com" ] şeklinde tek tek yazılabilir.
    methods:["GET" , "POST"] //-> diğerinde "GET POST" şeklinde yazılıyordu bunda iseikinci parametre şeklinde ekleniyor.
})) 


//headerı APİ tarafından karşı tarafa gönderirken linklerin üstünde bulunması önemli
app.use("/api/product", products )
app.use( "/", home )



app.listen(3000 , () => {
    console.log("listening on port 3000")
}) 