'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Product = require('./Modelos/product')
const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/hola',(req,res)=>{

     res.status(200).send({message:"Bienvenido"})

})

app.get('/api/product',(req,res)=>{

    res.status(200).send('Aqui devolvemos los productos')

})

app.get('/api/product/:productId',(req,res)=>{

    let ProductId = req.params.productId
    Product.findById(ProductId,(err,product)=>{
        if(err) return res.status(500).send({message:'error al realizar la peticion'})
        if(!product) return res.status(404).send({message:'Error el producto no existe'})

        res.status(200).send({product})
    })

   
})

app.post('/api/product',(req,res)=>{
    
    let product = new Product()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    product.save((err,productStore)=>{

        if(err) res.status(500).send(`Error base de datos> ${err}`)

        res.status(200).send({product:productStore})

    })

    
})

app.put('/api/product/:productId',(req,res)=>{

    let ProductId = req.params.productId
    Product.findById(ProductId,(err,product)=>{
        if(err) return res.status(500).send({message:'error al realizar la peticion'})
        if(!product) return res.status(404).send({message:'Error el producto no existe'})

        
        product.name = req.body.name
        product.picture = req.body.picture
        product.price = req.body.price
        product.category = req.body.category
        product.description = req.body.description
    
        product.save((err,product)=>{
    
            if(err) res.status(500).send(`Error base de datos> ${err}`)
    
            res.status(200).send({product})
    
        })
    
    })

   
})

app.delete('/api/product/:productId',(req,res)=>{

    let ProductId = req.params.productId
    Product.findById(ProductId,(err,product)=>{
        product.remove(ProductId,(err,product)=>{
        if(err) return res.status(500).send({message:'error al realizar la peticion'})
        if(!product) return res.status(404).send({message:'Error el producto no existe'})

        res.status(200).send({message:'El producto a sido borrado con exito'})
        })
    })


})


mongoose.connect('mongodb+srv://MarcoMena:dino45@cluster0-uhbbm.mongodb.net/test?retryWrites=true&w=majority',(err,res)=>{

     if(err) throw err
     console.log('Conexion establecida')


     app.listen(3000,()=>{

        console.log("Esta corriendo en puerto 3000")
    })
})
