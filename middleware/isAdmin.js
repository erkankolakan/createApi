// burada gelen req. içindeki admini kontrol edelim. Biz zaten isAdmin alanını token içerisine ekledik. Auth içerisinde de o anda decoded edilen yani doğruluk kontrolü edilen tokenin payload bilgisini req.user içerisine aktardık. O yüzden biz gelip de user içerisinden isAdmin alanını kontrol edebiliriz.

module.exports = (req ,res , next) => {
    if (!req.user.isAdmin) {
        return res.status(403).send("erişim yetkiniz yok :,(")
    }
    next()
}

//kullanıcı login olmuş ama admin gibi istediği sayfaya gidemiyor bunun hata kodu 403 dür.