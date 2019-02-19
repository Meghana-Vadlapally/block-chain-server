const multer = require('multer');
const Util = require('./utils');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const userId = Util.getUserId(req);
        console.log(userId);
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().getTime()+'-'+file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

module.exports = upload;