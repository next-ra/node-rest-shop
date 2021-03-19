const router = require('express').Router();
const checkAuth = require('../middlewares/check-auth');
const { upload } = require('../middlewares/multer');
const productController = require('../controllers/products');
const { checkId } = require('../middlewares/check-id');
const { createProductValidate } = require('../middlewares/celebrate-validate');

router.get('/', productController.get_all);

router.post(
  '/',
  checkAuth,
  upload.single('image'),
  createProductValidate,
  productController.create_product,
);

router.get('/:id', checkId, productController.get_product);

router.patch('/:id', checkAuth, checkId, productController.update_product);

router.delete('/:id', checkAuth, checkId, productController.delete_product);

module.exports = router;
