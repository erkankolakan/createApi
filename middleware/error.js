module.exports = (err , req, res, next) => {
    // logging burda yapıyoruz artık bir hata gelirse burası çalışıcak.
    res.status(500).send("bir hata oluştu lütfen daha sonra tekrar deneyin")
    //herhangi bir catch den hata gelirse burası çalışıcak bu sayede her catch in altına tek tek bu uzun mesajı yazmak zorunda kalmadık.
}