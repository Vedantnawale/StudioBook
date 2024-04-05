import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Corrected destination path
    },
    filename: function(req, file, cb) {
       let ext = path.extname(file.originalname);
       cb(null, Date.now() + ext); 
    }
});

const uploads = multer ({
    storage: storage,
    fileFilter: function(req, file, callback) {
        const allowedTypes = ["image/png", "image/jpeg"];
        if (allowedTypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            console.log("Only jpg & png files are supported!"); // Log error message
            callback(new Error("Only jpg & png files are supported!")); // Pass error to callback
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2 // 2 MB file size limit
    }
});

export default uploads;
