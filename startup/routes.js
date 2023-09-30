// middlewarelerim ve routeslerim bu sayfada olacak



const express = require("express")
const products = require("../routes/products")
const categories = require("../routes/categories")
const users = require("../routes/users")
const home = require("../routes/home")
const error = require("../middleware/error")

module.exports = (app) =>{
    app.use(express.json()) //gelen datanın Json olarak okunacağını söylüyoruz
    app.use("/api/product", products )
    app.use( "/api/categories", categories)
    app.use( "/api/users", users)
    app.use( "/", home )
    // tüm routenin altına yazmak önemlidir.  Hataları burdan kontrol edeceğiz. NE ZAMAN BİR HATA OLURSA BU MİDDLEWARE BİZİM İÇİN ÇALIŞACAK
    app.use(error )
}