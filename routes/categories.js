const express = require("express")
const router = express.Router()
const {Category , validateCategory} = require("../models/category")

router.get( "/" ,async(req, res) => {
    const categories = await Category.find().populate("products","name price -_id")
    res.send(categories)

})

router.get( "/:id" ,async(req, res) => {

    const id = req.params.id
    const category = await Category.findById(id)

    if (!category) {
        return res.send("aradığınız kategori bulunamadı")
    }

    res.send(category)
})

router.post( "/" ,async(req, res) => {

    const {error} = validateCategory(req.body)

    if (error) {
        return  res.status(400).send(error.details[0].message)
    }

    const category = new Category({
        name: req.body.name,
        products: req.body.products
    })
        const newCategory = await category.save() 
        res.send(newCategory)
})


router.put("/:id" , async (req, res) => {
    
    const id = req.params.id
    const  category = await Category.findById(id)

    if (!category) {
        return  res.status(404).send("aradığınız ürün bulunamamkta")
    }

    const {error} = validateCategory(req.body)

    if(error){
        return  res.status(400).send(error.details[0].message)
    }

    category.name = req.body.name

    const updatedCategory = await category.save()

    res.send(updatedCategory)

    
    // const category = await Category.updateOne({_id:id} , {
    //     $set : {
    //         name : req.body.name
    //     }
    // } ,{new: true})

    // res.send(category)
});


router.delete("/:id", async(req ,res) => {
    const id = req.params.id;
    const deletCate = await Category.deleteOne({ _id : id},)
    res.send(deletCate)
}) 





module.exports = router
