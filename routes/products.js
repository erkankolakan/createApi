const express = require("express")
const router = express.Router()

//modeller
const {Product, Comment , validateProduct} = require("../models/product")

router.get("/", async(req ,res) => {
    const products = await Product.find()
                                  .populate("category", "name -_id")
                                  .select("-isActive") // productın isActive ve _id parametresi gelmesin.

/*

    * populate ile extra bir sorguyu göndermiş oluruz. Burada category propertisi üzerinden extra bir sorgu gönderiyoruz 
    * Biz eğer bunu yapmazsak category bilgisini id değerini getirir. Böyle yaparsak category bilgisini çiçek gibi açar içinden id değeri name değerini de getirir.
    * Biz biz tüm değerleri istemiyorsak sadece arasından bir belirli değerleri almak istiyorsak populate ye 2. parametre olarak bir değer gireriz. istediğimiz değeri yazarız. Sitemediğimiz değeri de - ile belirtiriz

*/

    res.send(products)
})

router.post("/", async (req ,res) => {
        const {error} = validateProduct(req.body)

        if ( error ) {
            return res.status(400).send(error.details[0].message)
        }

        //Nesne
        const product = new Product({ 
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            isActive: req.body.isActive,
            category: req.body.category,
            comments: req.body.comments //-> tabiki ürün eklendikten sonra post edildikten sonra comment bilgisi bizim için aslında ürüne yapılana bir güncelleme üzerinden olması gerekir. Ayrı bir rooute yazılabilir veya güncelleme rooute si de kullanabilir
        });

            const newProduct = await product.save();
            res.send(newProduct);
})

router.put("/comments/:id", async (req ,res) => {
    const id = req.params.id
    const product = await Product.findById(id)

    if (!product) {
        return res.status(404).send("aradıınız ürün bulunamadı")
    }
    //Nesne
    const comment = new Comment({
        text: req.body.text,
        username: req.body.username
    });

    product.comments.push(comment) //product listesindeki comments dizisine gelen yorumu pushladık

        const updateProduct = await product.save();
        res.send(updateProduct);

/* İlk ürünü bul daha sonra üründeki yorum yorum bilgileri yerine yeni göndermiş olduğumuz bilgileri yerleştir. dateBase de kaydetmek için ürünüdeki güncellemeyi save() sayesinde güncelle */
})

router.delete("/comments/:id", async (req ,res) => {
    const id = req.params.id
    const product = await Product.findById(id)

    if (!product) {
        return res.status(404).send("aradıınız ürün bulunamadı")
    }

    const comment = product.comments.id(req.body.commentid)    //liste içerisinden id ye göre ilgili yorumu almak istiyorum. id methodu alt dökümanda bizim içinde idye göre id sorgulamsını yapıyor.
    comment.deleteOne();

    const updateProduct = await product.save()
    res.send(updateProduct)

/*Temel mantık basit ilk önce ürüne erişiyoruz daha sonra bu üründeki categoris dizi içindeki yorumların bulunduğu diziye bakıyoruz ve body den göndermiş olduğumuz id sayesine ilgili yorumu bulup siliyoruz. dateBase de kaydetmek için ürünüdeki güncellemeyi save() sayesinde güncelle */
})

router.put("/:id", async(req ,res) =>{

    //1. parametre öğe seçme işlemi, 2. parametrede ise hangi alanları set etmek istiyorzu yanii güncellemek istiyorsunuz.

    const id = req.params.id

    // const product = await Product.findByIdAndUpdate({_id: id},{
    //         $set:{
    //             name : req.body.name,
    //             price : req.body.price,
    //             description : req.body.description,
    //             imgUrl : req.body.imgUrl,
    //             isActive : req.body.isActive,
    //         }
    //     },{new:true});

    //     res.send(product);
    /* burada result bize update edilen kayıt sayısını veririr. Ama bu öğeyi güncelledi gerçeğini değiştirmiyor.
        Bunun güzel yani öğeyi seçiyim sonra gidiyim güncelliyim diye birşey yok tek sorguda seçip güncelliyoruz.
        Sadece id ile alakalı değil istersek isActive si true olantüm ürünleri güncelle diyebiliriz

        !!! updateOne demek yerine findByIdAndUpdate diyerek güncellemeden önceki değerleri alabiliriz 
        !!! yine findByIdAndUpdate kullanarak ve 3. parametreye {new: true} diyerek güncellemeden sonraki değeri alabiliriz
    */


    const product = await Product.findById({_id:id});


    if (!product) {
        return res.status(400).send("aradığınız ürün bulunamadı")
    }
    const {error} = validateProduct(req.body)   

    if ( error ) { 
        return res.status(400).send(result.error.details[0].message)
    }

   product.name = req.body.name; 
   product.price = req.body.price;
   product.description = req.body.description;
   product.imgUrl = req.body.imgUrl;
   product.isActive = req.body.isActive;
   product.category = req.body.category;
   res.send(product)

   const updatedProduct = await product.save() // güncellemeden sonra save etmeyi unutmaman gerekir
   res.send(updatedProduct)
});

router.delete("/:id" , async(req, res) => {
    const id = req.params.id

    const product = await Product.deleteOne({ _id : id })
    if (!product) { // burayı deleteOne de kullanamayız onun için findByIdAndDelete kullanmak gerek
        return res.status(404).send("Ürün silinirken hata oluştu veya belge bulunamadı.");
    }

    res.send(product)

// deleteOne bir öğeyi silmek için kullanılır
// deleteMany ilgili kritere uyan öğeleri silmek için kullanılır. 
/* silinen öğeyi almak içinde findByIdAndDelete(id) -- kullanılabilir. Bunda sadece id değeri gönderilir.
    const product = findByIdAndDelete(id) şeklinde kullanırsak bunlar üstünde hata raporları da alabiliriz. ÇÜNKÜ FİNDBTID DEĞERİ NULL VEYA BİR DEĞER DÖNDÜREBİLİR
    if (!product) { // burayı deleteOne de kullanamayız onun için findByIdAndDelete kullanmak gerek
        return res.status(404).send("Ürün silinirken hata oluştu veya belge bulunamadı.");
    }

    res.send(product)
*/
//--------------------------------------------------------------------------------------------
})


router.get("/:id" , async(req, res) => {
    const id = req.params.id
    const product = await Product.findById({_id:id}).populate("category", "name -_id");

    if (!product) {
        return res.status(404).send("Böyle bir ürün bulunamadı")
    }
    res.send(product)
})



module.exports = router



/*
Query Oparators
-- const products = await Product.find({price :10000 , isActive: true }) //where koşulu gibi price değeri 10000 olanı getir demiş olduk
-- const products = await Product.find({isActive: true }).select({ name:1 }) // name değerine 1 dersek sadece name kolonunu diğerlerinini 0 kabul eder. Eğer name değerine 0 dersek name değerini almaz diğer tüm kolonları alır
-- const products = await Product.find({isActive: true }).limit(2).select({ name:1 }) // bu şekilde limit yazarsak gelen 100 tane obje varsa 10 tanesini alır.

*/