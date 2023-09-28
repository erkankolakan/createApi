//  biz buraya tüm hataları taşıdığımız için loggerı burda kullanmak oldukça mantıklı bir hareket olacaktır.

const logger = require("../middleware/logger")

module.exports = (err , req, res, next) => {
    logger.error(err.message)
    res.status(500).send("bir hata oluştu lütfen daha sonra tekrar deneyin")
}

//logger.info yerine info.err, info.warn veya info.log() diyerek mesajı direk yazdıra biliriz mesaj yazmazsak logger içindeki level aktif olacaktır.
