/* Biz bu token varmı yok mu, Yetkili bir token mi değilmi sorunus bir çok yerde kullanacağız ve biir sürü router içinde bulunacak bir validate işlemi. Bu yüzden global bir alanda tanımlamak daha mantıklıdır*/
const jwt = require("jsonwebtoken")
const config = require("config")

module.exports = (req , res , next) => {
    const token = req.header("x-auth-token")
    if (!token) {
        return res.status(401).send("yetkiniz yok")
    }
    
    try {
        const deCodedToken = jwt.verify(token, config.get("auth.jwtPrivateKey"))
        req.user = deCodedToken
        next()
    } catch (ex) {
        res.status(400).send("hatalı token")
    }
    
//-> verify methoduna ilk parametrede token bilgisini gönderiyoruz 2. parametrede ise bu tokeni validate edicek string bilgisini göndermemiz gerekir. String bilgsini ortam değişkenlerine ekliyeceğiz.
//-> mantık şu şekilde ilgili key değerine göre token bilgisi verify(doğrulamak) edilicek. Eğer doğruluğu varsa decodedToken bilgisi gelecek yani token çözülecek. Çözülme sonucunda da bize PAYLOAD bilgisi gelecek bunda da biz hangi değeri içinde saklamışsak odur. Eğer doğruluğu yoksa verify bir hata döndürü bundan dolayı biz bu işlemi try cath içerisinde yaparız.
} 

/* geçerli bir token olup olmadığı server tarafından kontrol edilicek. Eğer geçerli ise aşağıdaki kodlar işletilicek değilse 401 yani yetiksiz erişim hatasını verecektir . */


