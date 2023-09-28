const express = require("express")
const app = express()

const mongoose = require("mongoose")

const products = require("./routes/products")
const categories = require("./routes/categories")
const users = require("./routes/users")
const home = require("./routes/home")
const cors = require("cors")
const error = require("./middleware/error")
const logger = require("./middleware/logger")

app.use(express.json()) //gelen datanın Json olarak okunacağını söylüyoruz

app.use(cors({
    origin:"*",  
    methods:["GET" , "POST"]
})) 

app.use("/api/product", products )
app.use( "/api/categories", categories)
app.use( "/api/users", users)
app.use( "/", home )

// tüm routenin altına yazmak önemlidir.  Hataları burdan kontrol edeceğiz. NE ZAMAN BİR HATA OLURSA BU MİDDLEWARE BİZİM İÇİN ÇALIŞACAK
app.use(error )



const userName = "erkankolakan";
const password = "tmVuxo01HxJRuSz2";
const dataBase = "shopdb";

//--> burası normalde  mongodb.net/?retryWrites= bu şekilde biz /? arasına data basenin ismi  ne olsun istiyorsak onu yazıyoruz

(async () => {
    try {
        await mongoose.connect(`mongodb+srv://${userName}:${password}@cluster0.shuzdaz.mongodb.net/${dataBase}?retryWrites=true&w=majority`);
        logger.info("mongoDb bağlantısı kuruldu");
    }
    catch (err) {
        console.log(err);
    }
})();

 
app.listen(3000 , () => {
    console.log("listening on port 3000")
}) 