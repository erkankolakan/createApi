const express = require("express")
const app = express()

const products = require("./routes/products")
const home = require("./routes/home")

app.use("/api/product", products )
app.use( "/", home )

app.use(express.json()) //gelen datanın Json olarak okunacağını söylüyoruz


app.listen(3000 , () => {
    console.log("listening on port 3000")
})