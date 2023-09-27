const express = require("express")
const router = express.Router()
const {User ,validateRegister, validateLogin } = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


router.get("/" , (req, res) => {
    res.send("selam dunya");
})


router.post("/" , async(req, res) => {
    const {error} = validateRegister(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({email : req.body.email})

    if (user) {
        return res.status(400).send("Bu meil adresine sahip bir kullanıcı var");
    }

    hashedPasword= await bcrypt.hash(req.body.password , 10) //şifreyi hashleme işlemi

    user = new User({ //User tablosunda user adında yeni bir satır aç yeni kullanıcı geldi
        name: req.body.name,
        email: req.body.email,
        password: hashedPasword //dataBaseye şifreleri hasleyerek göndermiş olduk
    }) 


    await user.save();

    res.send(user)

})

router.post("/auth", async (req, res) => {
    const {error} = validateLogin(req.body) //validate loginine bilgileri gönderip kontorl ettiriyoruz.
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    let user = await User.findOne({email : req.body.email})

    if (!user) {
        return res.status(400).send("hatalı email veya parola")
    }

//****
    const isSuccess = await bcrypt.compare(req.body.password, user.password ) 
//****
    if (!isSuccess) {
        return res.status(400).send("hatalı parola")
    }

// Kullancı bilgilerini başarılı bir şekilde girdiyse ona bir web Token vereceğiz.

    const token = jwt.sign({id: user._id}, "jwtPrivateKey") 

    res.send(token)

/* 
    sing() methodu bizden ilk başta PAYLOAD bilgisi bekler PAYLOAD da bizim saklamak istediğimiz bilgilerdir. Örneğin username id gibi bilgiler. 2. parametre olarak bir key bilgisi tanımlıyoruz. Herhangi bir string değer yazılabilir.
*   jsw kullanmak için npm i jsonwebtoken paketini indirmemiz gerekir.
*/
} )

module.exports = router