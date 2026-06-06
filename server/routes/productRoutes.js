// server/routes/productRoutes.js
const express = require('express');
const { getProducts, createProduct, deleteProduct } = require('../controllers/productController'); // Must have '../'
const { protect, authorize } = require('../middleware/authMiddleware'); // Must have '../'
const router = express.Router();

router.get('/', getProducts);
router.post('/', protect, authorize('farmer', 'admin'), createProduct);
router.delete('/:id', protect, authorize('farmer', 'admin'), deleteProduct);

module.exports = router;