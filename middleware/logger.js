const {transports , format, createLogger} = require("winston")
const {combine, timestamp, prettyPrint} = format

const logger = createLogger({
    level: "debug", //-> buraya error info gibi leveller de yazılabilir.
    // format: winston.format.json(), //-> bize json tipinde default bir mesaj gönderir.

    // zaman bilgisini veya farklı özellikler eklemek istersen aşağıdaki gibi bir format yazmalısın
    format: combine (
        timestamp({
            format: "MM-DD-YYYY HH:mm:ss"
        }),
        prettyPrint() //daha düzgün bir şekilde her gelen hatayı alt satıra taşır
    ),

    transports:[ //en önemli kısmı budur bir kaçtane ortama bu kaydı yapabiliyoruz
        new transports.Console(), //-> console ekranına çıktı alıcaz
        new transports.File({filename: "logs.log"}) //-> dosya ismini yazdık dosayayı kendisi oluşturuyır ve içine gelen hataları not alıyor
    ]
})

module.exports = logger