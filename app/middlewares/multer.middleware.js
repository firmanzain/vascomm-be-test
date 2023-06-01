const multer = require('multer');
const fs = require('fs-extra');
const config = require('../../config/config');

const uploadImageCustomer = () => {
    const storage = multer.diskStorage({
        destination(req, file, cb) {
            const destination = `public${config.publicPath.pathCustomer}`;
            fs.mkdirsSync(destination);
            cb(null, destination);
        },
        filename(req, file, cb) {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const fileExt = file.originalname.split('.');
            cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt[fileExt.length - 1]}`);
        },
    });
  
    // validate type uploaded file(only png. jpeg, and jpg)
    const upload = multer({
        storage,
        fileFilter: (req, file, cb) => {
            if (
                file.mimetype === 'image/png'
                || file.mimetype === 'image/jpg'
                || file.mimetype === 'image/jpeg'
                || file.mimetype === 'image/gif'
                || file.mimetype === 'image/ico'
            ) {
                cb(null, true);
            } else {
                cb(null, false);
            }
        },
    });
    
    return upload;
};

module.exports = {
  uploadImageCustomer,
};