const config = require("config")
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

const userName = config.get("db.userName");  //bu bilgileri development.json içerisinde tutuyoruz
const password = config.get("db.password");
const dataBase = config.get("db.dataBase");

(async () => {
    try {
        await mongoose.connect(`mongodb+srv://${userName}:${password}@cluster0.shuzdaz.mongodb.net/${dataBase}?retryWrites=true&w=majority`);
        logger.info("mongoDb bağlantısı kuruldu");
    }
    catch (err) {
        console.log(err);
    }
})();


console.log(config.get("name")); // config.get diyerek burada tanımlamış olduğumuz herhangi bir key bilgisine göre bu dosya içerisinde bu bilgi alınarak sayfa üzerinde yazdıralabilir.
 
const port = process.env.PORT || 3000;

app.listen(port , () => {
    console.log(`listening on port ${port}`)
})  