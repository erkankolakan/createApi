const express = require("express")
const router = express.Router()
const {User ,validateUser } = require("../models/user")
const bcrypt = require("bcrypt")



router.get("/" , (req, res) => {
    res.send("selam dunya");
})


router.post("/" , async(req, res) => {
    const {error} = validateUser(req.body);
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


module.exports = router