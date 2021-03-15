const multer = require('multer');
const path = require('path');
const uuid = require('uuid').v4;
const BadRequest = require('../../customErrors/BadRequest');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const id = uuid();
    const fileName = `${id}${ext}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(
      new BadRequest(`неверный формат файла, доступные: jpg, jpeg, png`),
      false,
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 3 },
});

module.exports = {
  upload,
};
