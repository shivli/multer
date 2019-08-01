var multer = require('multer');
let fs = require('fs-extra');
var path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, next) {
        body = req.body;
        let path = "./upload_" + req.body.id + "/"
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
        
        next(null, path);

    },
    filename: function (req, file, cb) {
        var filename = file.originalname;
        var fileExtension = filename.split(".")[1];
        cb(null, Date.now()+ Math.random(1000) + "." + fileExtension);
    }
});
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.pdf' && ext !== '.jpeg') {
            req.fileValidationError = 'File type not Allowed';
            return callback(null, false, new Error('File type not Allowed'));

        }
        callback(null, true)
    },
    limits: { fileSize: 100000 },
}).array('profiles', 4);

exports.bulk = (req, res) => {
    try {
        fs.emptyDirSync("./upload_" + req.params.id+ "/")
        upload(req, res, function (err) {
            if (req.fileValidationError) {
                return res.end(req.fileValidationError);
            } else
                if (err instanceof multer.MulterError) {
                    return res.end("Multer Error");
                }
            if (err) {
                return res.end("Error uploading file.");
            }
      
            res.send(req.files);
        });
    }
    catch (e) {
        console.log(e)
    }
};
