const config = require("config")
const {transports , format, createLogger} = require("winston")
const {combine, timestamp, prettyPrint} = format
require("winston-mongodb")

const userName = config.get("db.userName");  //bu bilgileri development.json içerisinde tutuyoruz
const password = config.get("db.password");
const dataBase = config.get("db.dataBase");


const logger = createLogger({
    level: "debug", //defaul olarak debug modda çalışacaklar
    format: combine (
        timestamp({format: "MM-DD-YYYY HH:mm:ss"}),
        prettyPrint()
    ),
    transports:[
        new transports.Console(),
        new transports.File({filename: "logs/logs.log" , level: "error", maxFiles:"3d"}), // sadece error mesajşarını dosyaya kaydet
        new transports.File({filename: "logs/exceptions.log" , level: "error", handleExceptions: true , handleExceptions:true , maxFiles:"3d"}),
        new transports.MongoDB({
            level: "error", //-> hangi hatalar veri tabanına kayıt olsun. error etiketi olanlar kayıt olsun. Ayrıca biz burada yukardaki debug bilgisini ezerek normal servis ettiğimiz zamanda hataların databaseye kaydolmasını söyledik ama Console fln onlar sadece debug modda çalışır. İstediğimiz yerde üsteki yazan debug bilgisini ezebiliriz
            db: `mongodb+srv://${userName}:${password}@cluster0.shuzdaz.mongodb.net/${dataBase}?retryWrites=true&w=majority`,
            options:{
                useUnifiedTopology: true
            },
            collection:"server_logs" //-> verir tabanında server_log isminde kaydolucak bu bilgiler
        })
    ]
});

module.exports = logger

// uncaughtException olayını kullanarak, uygulamanızda yakalanmayan hataları yakalayabilirsiniz. Bu, uygulamanızın beklenmedik bir şekilde çökmesini önlemeye yardımcı olabilir.

// unhandledRejection olayını kullanarak, uygulamanızda işlenmeyen Promise hatalarını yakalayabilirsiniz. Bu,    uygulamanızın beklenmedik bir şekilde çökmesini önlemeye yardımcı olabilir.
