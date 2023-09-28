const {transports , format, createLogger} = require("winston")
const {combine, timestamp, prettyPrint} = format
require("winston-mongodb")


const userName = "erkankolakan";
const password = "tmVuxo01HxJRuSz2";
const dataBase = "shopdb";

const logger = createLogger({
    level: "debug", //defaul olarak debug modda çalışacaklar
    format: combine (
        timestamp({format: "MM-DD-YYYY HH:mm:ss"}),
        prettyPrint()
    ),
    transports:[
        new transports.Console(), 
        new transports.File({filename: "logs.log" , level: "error"}), // sadece error mesajşarını dosyaya kaydet
        new transports.MongoDB({
            level: "error", //-> hangi hatalar veri tabanına kayıt olsun. error etiketi olanlar kayıt olsun. Ayrıca biz burada yukardaki debug bilgisini ezerek normal servis ettiğimiz zamanda hataların databaseye kaydolmasını söyledik ama Console fln onlar sadece debug modda çalışır. İstediğimiz yerde üsteki yazan debug bilgisini ezebiliriz
            db: `mongodb+srv://${userName}:${password}@cluster0.shuzdaz.mongodb.net/${dataBase}?retryWrites=true&w=majority`,
            options:{
                useUnifiedTopology: true
            },
            collection:"server_logs" //-> verir tabanında server_log isminde kaydolucak bu bilgiler
        })
    ]
})

module.exports = logger