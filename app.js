const express = require("express")
const app = express()

require("./startup/logger")

require("./startup/routes")(app) //-> fonksiyonu çağırıyoruz ve ihtiyacı olan parametreyi gönderiyoruz
require("./startup/db")()
if (app.get("env") == "production")  { //uygulmamanın yayımlandığı yer production sa bu paketleri kullan
    require("./startup/production")(app)
}

/*
app.get("env")  ile process.env.NODE_ENV aynı işleve yarar çevresel değişkenine uygulamanın çalıştığı ortamı (çevresi) döndüren bir yöntemdir.
*/

const port = process.env.PORT || 3000;

app.listen(port , () => {
    console.log(`listening on port ${port}`)
})

// app.use(cors({
// origin:"*",  
// methods:["GET" , "POST"]
// })) 