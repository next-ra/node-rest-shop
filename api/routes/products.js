const router = require('express').Router();
const { upload } = require('../middlewares/multer');
const productController = require('../controllers/products');
const { checkId } = require('../middlewares/check-id');
const {
  createProductValidate,
  updateProductValidate,
} = require('../middlewares/celebrate-validate');

router.post(
  '/',
  upload.single('image'),
  createProductValidate,
  productController.create_product,
);

router.patch(
  '/:id',
  checkId,
  updateProductValidate,
  productController.update_product,
);

router.delete('/:id', checkId, productController.delete_product);

module.exports = router;
