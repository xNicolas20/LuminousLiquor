import express from "express";
import Product from '../schema/productsSchema.js';

const router = express.Router()

//get all products
router.route('/').get( async (req, res) => {

    Product.find({}, function(err, val){
        if (err) console.log(err);
        res.send(val)
    })

    // const query = Product.find({})

    // query.exec(function (err, val) {
    //     if (err) return next(err);
    //     res.send(val);
    // })

})

//get products by id 
router.route('/:id').get( async (req, res) => {
    const getId = req.params.id;

    Product.findById({_id: getId}, function(err, val){
        if (err) console.log(err);
        res.send(val)
    })

    // const query = Product.find({})

    // query.exec(function (err, val) {
    //     if (err) return next(err);
    //     res.send(val);
    // })

})

//Create new Product
router.route('/').post( async (req, res) => {

    const newProduct = new Product(

        {

            id: req.body.id,

            category: req.body.category,

            name: req.body.name,

            description: req.body.description,

            stock: req.body.stock,

            size: req.body.size,

            image: req.body.image,

            prodId: req.body.prodId,

            quantities: req.body.quantities,

            price: req.body.price,

            recent: req.body.recent

        }

    )

    try{
        newProduct.save()
    }
    catch(err){
        console.log(err)
    }

    console.log("It Worked")
    res.send('Product Created')
})

//edit products
router.route('/:id').put( async (req, res, next) => {
    const getId = req.params.id;

    Product.findOneAndUpdate({id: getId}, req.body).catch((err) => {console.log(err)})

    res.send("Product Updated")
})

//delete products
router.route('/:id').delete( async (req, res, next) => {
    const getId = req.params.id;

    Product.findOneAndDelete({id: getId}).catch((err) => {console.log(err)})

    res.send("Product Deleted")
})

export default router

