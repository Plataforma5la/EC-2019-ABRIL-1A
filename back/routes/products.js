const express = require('express');
const router = express.Router();
const {Product} = require('../db/models/index');
const Sequelize= require('sequelize');
const Op = Sequelize.Op;

router.get('/all', function (req, res) {
    Product.findAll()
        .then((products) => {
            res.json(products)
        })
})

router.get('/id/:id', function (req, res) {
    console.log("entre")
    let id = req.params.id;
    Product.findOne({ where: { id: id } })
        .then(product => res.json(product))
})

router.get('/:name', function (req, res) {
   let nombre = req.params.name;
  Product.findAll({
       where: {
           name:  Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + nombre + '%')
       }
   })
       .then((products) => {
          return res.json(products)
       })
})

module.exports = router;