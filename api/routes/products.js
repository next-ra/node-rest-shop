const router = require('express').Router();
const checkAuth = require('../middlewares/check-auth');
const { upload } = require('../middlewares/multer');
const productController = require('../controllers/products');

router.get('/', productController.get_all);

router.post(
  '/',
  checkAuth,
  upload.single('productImage'),
  productController.create_product,
);

router.get('/:productId', productController.get_product);

router.patch('/:productId', checkAuth, productController.update_product);

router.delete('/:productId', checkAuth, productController.delete_product);

module.exports = router;
