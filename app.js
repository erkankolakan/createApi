const express = require("express")
const app = express()

require("./startup/logger")

require("./startup/routes")(app) //-> fonksiyonu çağırıyoruz ve ihtiyacı olan parametreyi gönderiyoruz
require("./startup/db")()


// app.use(cors({
//     origin:"*",  
//     methods:["GET" , "POST"]
// })) 

const port = process.env.PORT || 3000;

app.listen(port , () => {
    console.log(`listening on port ${port}`)
})  