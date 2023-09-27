const express = require("express")
const router = express.Router()
const {User ,validateUser } = require("../models/user")



router.get("/" , (req, res) => {
    res.send("selam dunya");
})


router.post("/" , (req, res) => {

    

})


module.exports = router