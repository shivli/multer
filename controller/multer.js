
var multer = require('multer');
let fs = require('fs-extra');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let id = req.body.id;
        let path = `./upload/${id}`;
        fs.mkdirsSync(path);
        cb(null, path);
    
    },
    filename: function (req, file, cb) {
        var filename = file.originalname;
        var fileExtension = filename.split(".")[1];
        cb(null, Date.now() + "." + fileExtension);
    }
});
var upload = multer({ storage: storage }).array('profiles', 4);

exports.bulk = (req, res) => {
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.send(req.files);
    });
};



