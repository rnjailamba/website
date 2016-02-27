var express = require('express');
var router = express.Router();


// INDEX
// ==============================================
router.get('/all', function(req, res, next) {
  res.render('products/productsAll', { title: 'All products' });
});


// PRODUCTPAGE
// ==============================================
router.get('/productPage', function(req, res, next) {
  res.render('products/productPage', { title: 'Product Page' });
});


// PRODUCTCART
// ==============================================
router.get('/productCart', function(req, res, next) {
  res.render('products/productCart', { title: 'Product Page' });
});


// PRODUCTCHECKOUT
// ==============================================
router.get('/productCheckout', function(req, res, next) {
  res.render('products/productCheckout', { title: 'Product Page' });
});


// PRODUCTCONFIRMATION
// ==============================================
router.get('/productConfirmation', function(req, res, next) {
  res.render('products/productConfirmation', { title: 'Product Page' });
});



// PRODUCTFILTER2
// ==============================================
router.get('/productFilter2', function(req, res){

  res.render('products/productFilter2');

});


var justPrintSomething = function(){
    console.log("print something");
}

module.exports = router;
