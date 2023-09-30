//-> veri tabanına bağlandığımız kısım.

const mongoose = require("mongoose")
const logger = require("./logger")
const config = require("config")


    const userName = config.get("db.userName");  //bu bilgileri development.json içerisinde tutuyoruz
    const password = config.get("db.password");
    const dataBase = config.get("db.dataBase");

module.exports = () => {
    mongoose
        .connect(`mongodb+srv://${userName}:${password}@cluster0.shuzdaz.mongodb.net/${dataBase}?retryWrites=true&w=majority`)
        .then(() => logger.info("mongodb bağlantısı kuruldu"))
}

//-> Bizim veri tabanına bağlanma kısmında catch yazmadığımız için ele alınmayan bir hata bilgisi var bu normal şartlarda bir hata geldiği zaman uygulamamın çökmesine neden olur. Ama biz üstde unhandledRejection diyerek ele alınmayan hataları alıp hata dosyasına kaydediyorum.